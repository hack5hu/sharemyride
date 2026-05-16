import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';
import { ChatMessage, MessageStatus, ChatConversation } from '@/types/chat';

interface ChatState {
  messages: Record<string, ChatMessage[]>; // Keyed by conversationId
  conversations: ChatConversation[];
  connectionStatus: 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING';
  myUserId: string | null;
  setMyUserId: (userId: string | null) => void;
  addMessage: (conversationId: string, message: ChatMessage) => void;
  updateMessageStatus: (conversationId: string, messageId: string, status: MessageStatus) => void;
  linkPendingMessage: (conversationId: string, tempId: string, realId: string, status: MessageStatus) => void;
  setConversations: (conversations: ChatConversation[]) => void;
  setConnectionStatus: (status: 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING') => void;
  setHistory: (conversationId: string, messages: ChatMessage[]) => void;
  markConversationAsRead: (conversationId: string) => void;
  flushOldMessages: () => void;
  activeConversationId: string | null;
  setActiveConversation: (id: string | null) => void;
}

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: {},
      conversations: [],
      connectionStatus: 'DISCONNECTED',
      myUserId: null,
      activeConversationId: null,

      setMyUserId: (userId) => set({ myUserId: userId }),
      setActiveConversation: (id) => set({ activeConversationId: id }),

      addMessage: (conversationId, message) => {
        set((state) => {
          const chatMessages = state.messages[conversationId] || [];
          
          // Check if message ID already exists
          if (chatMessages.some(m => m.messageId === message.messageId)) return state;

          // Deduplication Logic: If this is a real message arriving via socket,
          // check if we have a PENDING message with the same content/sender that we should replace.
          const isRealMessage = !message.messageId.startsWith('temp-');
          let pendingIndex = -1;
          
          if (isRealMessage) {
            pendingIndex = chatMessages.findIndex(m => 
              m.messageId.startsWith('temp-') && 
              m.status === 'PENDING' && 
              m.content === message.content &&
              m.senderId === message.senderId
            );
          }

          let newMessagesList;
          if (pendingIndex > -1) {
            // Replace the pending message with the real one to preserve order and avoid flicker
            newMessagesList = [...chatMessages];
            newMessagesList[pendingIndex] = message;
          } else {
            // Add as new message
            newMessagesList = [...chatMessages, message];
          }
          
          const newMessages = {
            ...state.messages,
            [conversationId]: newMessagesList,
          };

          // Update conversations summary
          let updatedConversations = [...state.conversations];
          const convIndex = updatedConversations.findIndex(c => c.conversationId === conversationId);
          const existingConv = updatedConversations[convIndex];
          
          const isFromMe = message.senderId === state.myUserId;
          
          const mergedMetadata = {
            ...(existingConv?.metadata || {}),
            ...(message.metadata || {}),
          };

          const isActive = state.activeConversationId === conversationId;
          const isRead = message.status === 'READ';

          const convData: ChatConversation = {
            conversationId,
            participants: [message.senderId, message.receiverId],
            lastMessage: message,
            unreadCount: (isFromMe || isActive || isRead) ? (existingConv?.unreadCount || 0) : (existingConv?.unreadCount || 0) + 1,
            updatedAt: message.timestamp,
            metadata: mergedMetadata,
          };

          if (convIndex > -1) {
            updatedConversations[convIndex] = convData;
          } else {
            updatedConversations.unshift(convData);
          }

          return {
            messages: newMessages,
            conversations: updatedConversations,
          };
        });
      },

      updateMessageStatus: (conversationId, messageId, status) => {
        set((state) => {
          const chatMessages = state.messages[conversationId] || [];
          const updatedMessages = chatMessages.map((m) =>
            m.messageId === messageId ? { ...m, status } : m
          );
          return {
            messages: {
              ...state.messages,
              [conversationId]: updatedMessages,
            },
          };
        });
      },

      linkPendingMessage: (conversationId, tempId, realId, status) => {
        set((state) => {
          const chatMessages = state.messages[conversationId] || [];
          const updatedMessages = chatMessages.map((m) =>
            m.messageId === tempId ? { ...m, messageId: realId, status } : m
          );
          return {
            messages: {
              ...state.messages,
              [conversationId]: updatedMessages,
            },
          };
        });
      },

      setConversations: (newConversations) => {
        set((state) => {
          const merged = [...state.conversations];
          
          newConversations.forEach((newConv) => {
            const index = merged.findIndex(c => c.conversationId === newConv.conversationId);
            if (index > -1) {
              // Merge: Only update if new one is newer or has more data
              const existing = merged[index];
              if (newConv.updatedAt >= (existing.updatedAt || 0)) {
                merged[index] = { 
                  ...existing, 
                  ...newConv,
                  metadata: {
                    ...(existing.metadata || {}),
                    ...(newConv.metadata || {}),
                  }
                };
              }
            } else {
              merged.push(newConv);
            }
          });

          return { conversations: merged };
        });
      },

      setConnectionStatus: (status) => set({ connectionStatus: status }),

      setHistory: (conversationId, history) => {
        set((state) => {
          const lastMsg = history[history.length - 1];
          let updatedConversations = [...state.conversations];
          const convIndex = updatedConversations.findIndex(c => c.conversationId === conversationId);

          if (lastMsg) {
            const convData: ChatConversation = {
              conversationId,
              participants: [lastMsg.senderId, lastMsg.receiverId],
              lastMessage: lastMsg,
              unreadCount: updatedConversations[convIndex]?.unreadCount || 0,
              updatedAt: lastMsg.timestamp,
            };

            if (convIndex > -1) {
              updatedConversations[convIndex] = convData;
            } else {
              updatedConversations.unshift(convData);
            }
          }

          const statusPriority: Record<string, number> = { 
            READ: 3, 
            DELIVERED: 2, 
            SENT: 1, 
            PENDING: 0, 
            FAILED: 0 
          };
          
          const currentMessages = state.messages[conversationId] || [];

          // Merge server history, preserving higher local statuses
          const mergedHistory = history.map((newMsg) => {
            const existing = currentMessages.find((m) => m.messageId === newMsg.messageId);
            if (!existing) return newMsg;

            const newStatus = (newMsg.status || 'SENT').toUpperCase();
            const existingStatus = (existing.status || 'SENT').toUpperCase();
            
            const newPriority = statusPriority[newStatus] || 0;
            const existingPriority = statusPriority[existingStatus] || 0;

            return newPriority >= existingPriority ? { ...newMsg, status: newStatus as MessageStatus } : existing;
          });

          // KEY FIX: Re-append any local PENDING messages that aren't in server history yet.
          // Without this, optimistic messages disappear whenever fetchHistory is called
          // before the server has confirmed them — causing the "flicker" glitch.
          const serverIds = new Set(history.map(m => m.messageId));
          const orphanedPending = currentMessages.filter(
            m => m.status === 'PENDING' && !serverIds.has(m.messageId)
          );

          return {
            messages: {
              ...state.messages,
              [conversationId]: [...mergedHistory, ...orphanedPending],
            },
            conversations: updatedConversations,
          };
        });
      },

      markConversationAsRead: (conversationId) => {
        set((state) => {
          const updatedConversations = state.conversations.map((c) => {
            if (c.conversationId === conversationId) {
              return { 
                ...c, 
                unreadCount: 0,
                lastMessage: c.lastMessage ? { ...c.lastMessage, status: 'READ' } : c.lastMessage
              };
            }
            return c;
          });
          
          return { conversations: updatedConversations };
        });
      },

      flushOldMessages: () => {
        const now = Date.now();
        set((state) => {
          const newMessages: Record<string, ChatMessage[]> = {};
          Object.keys(state.messages).forEach((convId) => {
            newMessages[convId] = state.messages[convId].filter(
              (m) => now - m.timestamp < FOURTEEN_DAYS_MS
            );
          });
          return { messages: newMessages };
        });
      },
    }),
    {
      name: 'tuktuk-chat-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
