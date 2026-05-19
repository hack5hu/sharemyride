import { Client } from '@stomp/stompjs';
import * as Keychain from 'react-native-keychain';
import { BASE_URL } from '@/constants/apiEndpoints';
import { useChatStore } from '@/store/useChatStore';
import { ChatMessage, SendMessagePayload } from '@/types/chat';
import { MessageStatus, MessageType, ConnectionStatus } from '@/constants/enums';
import apiClient from './apiClient';
import { Logger } from '@/utils/logger';
import { registerChatSubscriptions } from './chatSubscriptions';
import { fetchChatUserProfile } from './chatProfile';

// STOMP requires TextEncoder/TextDecoder in some environments
import 'fast-text-encoding';
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('fast-text-encoding').TextEncoder;
}
if (typeof TextDecoder === 'undefined') {
  global.TextDecoder = require('fast-text-encoding').TextDecoder;
}

interface HistoryMessage extends ChatMessage {
  messageStatus?: MessageStatus;
}

class ChatService {
  async fetchUserProfile(userId: string) {
    return fetchChatUserProfile(userId);
  }

  private client: Client | null = null;
  private currentUserId: string | null = null;

  async connect(userId: string) {
    if (this.client?.active && this.currentUserId === userId) {
      Logger.log('[Socket] Already active for user:', userId);
      return;
    }
    
    this.currentUserId = userId;
    const { setConnectionStatus } = useChatStore.getState();
    
    setConnectionStatus(ConnectionStatus.CONNECTING);
    
    const brokerUrl = BASE_URL.replace('http', 'ws') + '/ws/websocket';
    const authCreds = await Keychain.getGenericPassword({ service: 'auth_token' });

    if (!authCreds) {
      Logger.warn('[Socket] Missing auth token');
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
      return;
    }

    try {
      this.client = new Client({
        webSocketFactory: () => new WebSocket(brokerUrl),
        connectHeaders: {
          userId: userId,
          Authorization: `Bearer ${authCreds.password}`,
        },
        debug: (msg) => {
          Logger.log('STOMP:', msg);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
      });

      this.client.onWebSocketError = (event) => {
        Logger.error('[Socket] WebSocket Error:', event);
      };

      this.client.onWebSocketClose = (event) => {
        Logger.log('[Socket] WebSocket Closed:', event);
      };

      this.client.onConnect = () => {
        Logger.log('[Socket] Connected');
        setConnectionStatus(ConnectionStatus.CONNECTED);
        registerChatSubscriptions(this.client as Client, userId, {
          getConversationId: this.getConversationId,
          updateStatus: this.updateStatus.bind(this),
          markAsRead: this.markAsRead.bind(this),
          fetchHistory: this.fetchHistory.bind(this),
        });
      };

    this.client.onDisconnect = () => {
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    };

    this.client.onStompError = (frame) => {
      Logger.error('STOMP Error:', frame.headers.message);
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    };

      this.client.activate();
    } catch (error) {
      Logger.error('[Socket] Initialization failed:', error);
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    }
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
      useChatStore.getState().setConnectionStatus(ConnectionStatus.DISCONNECTED);
    }
  }

  sendMessage(payload: SendMessagePayload) {
    if (!this.client?.connected) {
      Logger.warn('Cannot send message: STOMP not connected');
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
      status: MessageStatus.PENDING,
      type: payload.type || MessageType.TEXT,
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
      const history = (response.data as HistoryMessage[]).map(m => ({
        ...m,
        status: (m.status || m.messageStatus || MessageStatus.SENT).toUpperCase() as MessageStatus,
        timestamp: m.timestamp || Date.now(),
      }));
      useChatStore.getState().setHistory(conversationId, history);
      return history;
    } catch (error) {
      Logger.error('Failed to fetch chat history:', error);
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
        if (m.receiverId === myUserId && m.status !== MessageStatus.READ) {
          updateMessageStatus(conversationId, m.messageId, MessageStatus.READ);
        }
      });

      await apiClient.post(`/api/v1/chat/read/${conversationId}/${myUserId}`);
    } catch (error) {
      Logger.error('Failed to mark messages as read:', error);
    }
  }


  private getConversationId(u1: string, u2: string): string {
    return u1 < u2 ? `${u1}_${u2}` : `${u2}_${u1}`;
  }
}

export const chatService = new ChatService();
