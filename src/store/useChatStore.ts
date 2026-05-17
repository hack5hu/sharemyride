import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';
import { ChatMessage, ChatConversation, UserProfile } from '@/types/chat';
import { ConnectionStatus, MessageStatus } from '@/constants/enums';

interface ChatState {
  messages: Record<string, ChatMessage[]>; // Keyed by conversationId
  conversations: ChatConversation[];
  connectionStatus: ConnectionStatus;
  myUserId: string | null;
  setMyUserId: (userId: string | null) => void;
  addMessage: (conversationId: string, message: ChatMessage) => void;
  updateMessageStatus: (conversationId: string, messageId: string, status: MessageStatus) => void;
  linkPendingMessage: (conversationId: string, tempId: string, realId: string, status: MessageStatus) => void;
  setConversations: (conversations: ChatConversation[]) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setHistory: (conversationId: string, messages: ChatMessage[]) => void;
  markConversationAsRead: (conversationId: string) => void;
  flushOldMessages: () => void;
  activeConversationId: string | null;
  setActiveConversation: (id: string | null) => void;
  users: Record<string, UserProfile>;
  upsertUser: (user: UserProfile) => void;
}

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: {},
      conversations: [],
      connectionStatus: ConnectionStatus.DISCONNECTED,
      myUserId: null,
      activeConversationId: null,
      users: {},

      setMyUserId: (userId) => set({ myUserId: userId }),
      setActiveConversation: (id) => set({ activeConversationId: id }),
      upsertUser: (user) => set((state) => ({
        users: { ...state.users, [user.userId]: user }
      })),

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
              m.status === MessageStatus.PENDING && 
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
          const isRead = message.status === MessageStatus.READ;

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

          // Also update the status in the conversation summary if it's the last message
          const updatedConversations = state.conversations.map((c) => {
            if (c.conversationId === conversationId && c.lastMessage?.messageId === messageId) {
              return {
                ...c,
                lastMessage: { ...c.lastMessage, status },
              };
            }
            return c;
          });

          return {
            messages: {
              ...state.messages,
              [conversationId]: updatedMessages,
            },
            conversations: updatedConversations,
          };
        });
      },

      linkPendingMessage: (conversationId, tempId, realId, status) => {
        set((state) => {
          const chatMessages = state.messages[conversationId] || [];
          const updatedMessages = chatMessages.map((m) =>
            m.messageId === tempId ? { ...m, messageId: realId, status } : m
          );

          // Also update the conversation summary
          const updatedConversations = state.conversations.map((c) => {
            if (c.conversationId === conversationId && c.lastMessage?.messageId === tempId) {
              return {
                ...c,
                lastMessage: { ...c.lastMessage, messageId: realId, status },
              };
            }
            return c;
          });

          return {
            messages: {
              ...state.messages,
              [conversationId]: updatedMessages,
            },
            conversations: updatedConversations,
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

          const statusPriority: Record<MessageStatus, number> = { 
            [MessageStatus.READ]: 3, 
            [MessageStatus.DELIVERED]: 2, 
            [MessageStatus.SENT]: 1, 
            [MessageStatus.PENDING]: 0, 
            [MessageStatus.FAILED]: 0 
          };
          
          const currentMessages = state.messages[conversationId] || [];

          // Merge server history, preserving higher local statuses
          const serverIds = new Set(history.map(m => m.messageId));
          const mergedHistory = history.map((newMsg) => {
            const existing = currentMessages.find((m) => m.messageId === newMsg.messageId);
            if (!existing) return newMsg;

            const newStatus = (newMsg.status || MessageStatus.SENT).toUpperCase() as MessageStatus;
            const existingStatus = (existing.status || MessageStatus.SENT).toUpperCase() as MessageStatus;
            
            const newPriority = statusPriority[newStatus] || 0;
            const existingPriority = statusPriority[existingStatus] || 0;

            return newPriority >= existingPriority ? { ...newMsg, status: newStatus } : existing;
          });

          // Keep all previous local messages that are NOT in the server fetched history
          // (this includes older local history and pending optimistic messages)
          const localOnlyMessages = currentMessages.filter(
            m => !serverIds.has(m.messageId)
          );

          // Combine them and sort chronologically so layout renders in correct sequence
          const allMerged = [...localOnlyMessages, ...mergedHistory].sort((a, b) => a.timestamp - b.timestamp);

          return {
            messages: {
              ...state.messages,
              [conversationId]: allMerged,
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
                lastMessage: c.lastMessage ? { ...c.lastMessage, status: MessageStatus.READ } : c.lastMessage
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
          
          // 1. Keep only messages within the last 14 days
          Object.keys(state.messages).forEach((convId) => {
            const filtered = state.messages[convId].filter(
              (m) => now - m.timestamp < FOURTEEN_DAYS_MS
            );
            if (filtered.length > 0) {
              newMessages[convId] = filtered;
            }
          });

          // 2. Clear dead chats (conversations with no activity in 14 days)
          const activeConversations = state.conversations.filter(
            (c) => now - c.updatedAt < FOURTEEN_DAYS_MS
          );

          return { 
            messages: newMessages,
            conversations: activeConversations 
          };
        });
      },
    }),
    {
      name: 'tuktuk-chat-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
