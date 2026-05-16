import { Client, IMessage } from '@stomp/stompjs';
import { BASE_URL } from '@/constants/apiEndpoints';
import { useChatStore } from '@/store/useChatStore';
import { ChatMessage, MessageStatus, SendMessagePayload, UpdateStatusPayload } from '@/types/chat';
import apiClient from './apiClient';

// STOMP requires TextEncoder/TextDecoder in some environments
import 'fast-text-encoding';
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('fast-text-encoding').TextEncoder;
}
if (typeof TextDecoder === 'undefined') {
  global.TextDecoder = require('fast-text-encoding').TextDecoder;
}

class ChatService {
  private client: Client | null = null;
  private currentUserId: string | null = null;

  connect(userId: string) {
    if (this.client?.active && this.currentUserId === userId) {
      if (__DEV__) console.log('🔄 [Socket] Already active for user:', userId);
      return;
    }
    
    this.currentUserId = userId;
    const { setConnectionStatus, addMessage, updateMessageStatus } = useChatStore.getState();
    
    setConnectionStatus('CONNECTING');
    
    const brokerUrl = BASE_URL.replace('http', 'ws') + '/ws/websocket';
    if (__DEV__) console.log('🔌 [Socket] Initializing connection to:', brokerUrl);

    try {
      this.client = new Client({
        webSocketFactory: () => new WebSocket(brokerUrl),
        connectHeaders: {
          userId: userId,
        },
        debug: (msg) => {
          if (__DEV__) console.log('STOMP:', msg);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
      });

      this.client.onWebSocketError = (event) => {
        console.error('❌ [Socket] WebSocket Error:', event);
      };

      this.client.onWebSocketClose = (event) => {
        if (__DEV__) console.log('🔌 [Socket] WebSocket Closed:', event);
      };

      this.client.onConnect = () => {
        if (__DEV__) console.log('✅ [Socket] Connected!');
        setConnectionStatus('CONNECTED');
      
      // Subscribe to private messages
      this.client?.subscribe('/user/queue/messages', (msg: IMessage) => {
        const data = JSON.parse(msg.body);
        if (__DEV__) console.log('📥 [Incoming Message]', data);

        const conversationId = this.getConversationId(data.senderId, data.receiverId);
        
        const { activeConversationId } = useChatStore.getState();
        const isFromOther = data.senderId !== userId;
        const isRead = isFromOther && activeConversationId === conversationId;
        
        const message: ChatMessage = {
          messageId: data.messageId,
          senderId: data.senderId,
          receiverId: data.receiverId,
          content: data.content,
          timestamp: data.timestamp || Date.now(),
          status: isRead ? 'READ' : 'DELIVERED',
          type: data.type || 'text',
          metadata: data.metadata,
        };
        
        addMessage(conversationId, message);
        
        // Auto-ack status (only for messages received from others)
        if (isFromOther) {
          const finalStatus = isRead ? 'READ' : 'DELIVERED';
          this.updateStatus(data.messageId, finalStatus, userId);

          // If user is actively in the chat, also notify backend to clear unread counts
          if (isRead) {
            this.markAsRead(userId, data.senderId);
          }
        }
      });

      // Subscribe to status updates
      this.client?.subscribe('/user/queue/status', (msg: IMessage) => {
        const data = JSON.parse(msg.body);
        if (__DEV__) console.log('📨 [Status Update]', data);
        
        const { messages, updateMessageStatus, linkPendingMessage, activeConversationId } = useChatStore.getState();
        
        // 1. Try to find the message by its ID
        let foundConvId = '';
        Object.keys(messages).forEach(convId => {
          if (messages[convId].some(m => m.messageId === data.messageId)) {
            foundConvId = convId;
          }
        });

        if (foundConvId) {
          if (__DEV__) console.log(`✅ [Status Update] Updating existing message ${data.messageId} to ${data.status}`);
          updateMessageStatus(foundConvId, data.messageId, data.status);
        } else {
          // 2. If not found, it might be a status update for a 'PENDING' message we just sent
          if (__DEV__) console.log(`🔍 [Status Update] ID ${data.messageId} not found, searching for PENDING message...`);
          
          let linked = false;
          Object.keys(messages).forEach(convId => {
            if (linked) return;
            
            const pendingMessage = [...messages[convId]]
              .reverse()
              .find(m => m.messageId.startsWith('temp-') && m.status === 'PENDING');
            
            if (pendingMessage) {
              if (__DEV__) console.log(`🔗 [Status Update] Linking ${pendingMessage.messageId} -> ${data.messageId} (${data.status})`);
              linkPendingMessage(convId, pendingMessage.messageId, data.messageId, data.status);
              linked = true;
            }
          });
          
          if (!linked) {
            if (__DEV__) console.warn(`⚠️ [Status Update] Could not find any pending message to link with ${data.messageId}`);
            
            if (activeConversationId) {
              const [u1, u2] = activeConversationId.split('_');
              const otherUser = u1 === userId ? u2 : u1;
              if (otherUser) {
                this.fetchHistory(userId, otherUser);
              }
            }
          }
        }
      });
    };

    this.client.onDisconnect = () => {
      setConnectionStatus('DISCONNECTED');
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message']);
      setConnectionStatus('DISCONNECTED');
    };

      this.client.activate();
    } catch (error) {
      console.error('❌ [Socket] Initialization failed:', error);
      setConnectionStatus('DISCONNECTED');
    }
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
      useChatStore.getState().setConnectionStatus('DISCONNECTED');
    }
  }

  sendMessage(payload: SendMessagePayload) {
    if (!this.client?.connected) {
      console.warn('Cannot send message: STOMP not connected');
      return;
    }

    const conversationId = this.getConversationId(payload.senderId, payload.receiverId);
    const tempId = `temp-${Date.now()}`;
    
    // Local-first: add pending message to store
    const tempMessage: ChatMessage = {
      messageId: tempId,
      senderId: payload.senderId,
      receiverId: payload.receiverId,
      content: payload.content,
      timestamp: Date.now(),
      status: 'PENDING',
      type: (payload.type as any) || 'text',
      metadata: payload.metadata,
    };
    
    useChatStore.getState().addMessage(conversationId, tempMessage);

    this.client.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(payload),
    });
  }

  updateStatus(messageId: string, status: MessageStatus, userId: string) {
    if (this.client?.connected) {
      this.client.publish({
        destination: '/app/chat.updateStatus',
        body: JSON.stringify({
          messageId,
          status,
          userId,
        }),
      });
    }
  }

  async fetchHistory(myUserId: string, otherUserId: string) {
    const conversationId = this.getConversationId(myUserId, otherUserId);
    try {
      const response = await apiClient.get(`/api/v1/chat/history/${myUserId}/${otherUserId}`);
      const history = response.data.map((m: any) => ({
        ...m,
        status: (m.status || m.messageStatus || 'SENT').toUpperCase(),
        timestamp: m.timestamp || Date.now(),
      }));
      useChatStore.getState().setHistory(conversationId, history);
      return history;
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
      return [];
    }
  }

  async markAsRead(myUserId: string, otherUserId: string) {
    const conversationId = this.getConversationId(myUserId, otherUserId);
    try {
      // Local-first: reset count immediately
      const { markConversationAsRead, messages, updateMessageStatus } = useChatStore.getState();
      markConversationAsRead(conversationId);
      
      // Refresh local status of all messages immediately (Optimistic Update)
      const chatMessages = messages[conversationId] || [];
      chatMessages.forEach(m => {
        if (m.receiverId === myUserId && m.status !== 'READ') {
          updateMessageStatus(conversationId, m.messageId, 'READ');
        }
      });

      await apiClient.post(`/api/v1/chat/read/${conversationId}/${myUserId}`);
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  }


  private getConversationId(u1: string, u2: string): string {
    return u1 < u2 ? `${u1}_${u2}` : `${u2}_${u1}`;
  }
}

export const chatService = new ChatService();
