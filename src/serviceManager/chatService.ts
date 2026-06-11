import { Client } from '@stomp/stompjs';
import * as Keychain from 'react-native-keychain';
import { BASE_URL } from '@/constants/apiEndpoints';
import { useChatStore } from '@/store/useChatStore';
import { ChatMessage, SendMessagePayload } from '@/types/chat';
import { MessageStatus, MessageType, ConnectionStatus, NotificationType } from '@/constants/enums';
import apiClient from './apiClient';
import { Logger } from '@/utils/logger';
import { registerChatSubscriptions } from './chatSubscriptions';
import { fetchChatUserProfile } from './chatProfile';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { useSettingsStore } from '@/store/settings';
import { en } from '@/constants/localization/en';
import { hi } from '@/constants/localization/hi';

import { parseChatTimestamp } from '@/utils/date';

const translations = { en, hi };

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
  createdAt?: string;
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
    const { setConnectionStatus, setMyUserId } = useChatStore.getState();
    
    setMyUserId(userId);
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
    const conversationId = this.getConversationId(payload.senderId, payload.receiverId);
    const tempId = `temp-${Date.now()}`;
    const isConnected = !!this.client?.connected;

    // Local-first: add message to store
    const tempMessage: ChatMessage = {
      messageId: tempId,
      senderId: payload.senderId,
      receiverId: payload.receiverId,
      content: payload.content,
      timestamp: Date.now(),
      status: isConnected ? MessageStatus.PENDING : MessageStatus.FAILED,
      type: payload.type || MessageType.TEXT,
      metadata: payload.metadata,
    };
    
    useChatStore.getState().addMessage(conversationId, tempMessage);

    if (!isConnected) {
      Logger.warn('Cannot send message: STOMP not connected');
      const lang = useSettingsStore.getState().language || 'en';
      const t = translations[lang] || en;
      showNotification(NotificationType.ERROR, t.chat.sendFailedTitle, t.chat.sendFailedMessage);
      return;
    }

    this.client!.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(payload),
    });
  }

  resendMessage(conversationId: string, messageId: string) {
    const { messages, updateMessageStatus } = useChatStore.getState();
    const chatMessages = messages[conversationId] || [];
    const localMsg = chatMessages.find(m => m.messageId === messageId);

    if (!localMsg) return;

    const isConnected = !!this.client?.connected;
    if (!isConnected) {
      Logger.warn('Cannot resend message: STOMP not connected');
      const lang = useSettingsStore.getState().language || 'en';
      const t = translations[lang] || en;
      showNotification(NotificationType.ERROR, t.chat.sendFailedTitle, t.chat.sendFailedMessage);
      return;
    }

    // Update status to pending
    updateMessageStatus(conversationId, messageId, MessageStatus.PENDING);

    const payload: SendMessagePayload = {
      senderId: localMsg.senderId,
      receiverId: localMsg.receiverId,
      content: localMsg.content,
      type: localMsg.type,
      metadata: localMsg.metadata,
    };

    this.client!.publish({
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
        timestamp: parseChatTimestamp(m),
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
      const { markConversationAsRead, messages, updateMultipleMessageStatuses } = useChatStore.getState();
      markConversationAsRead(conversationId);
      
      // Refresh local status of all messages immediately (Optimistic Update)
      const chatMessages = messages[conversationId] || [];
      const updates = chatMessages
        .filter(m => m.receiverId === myUserId && m.status !== MessageStatus.READ)
        .map(m => ({ messageId: m.messageId, status: MessageStatus.READ }));

      if (updates.length > 0) {
        updateMultipleMessageStatuses(conversationId, updates);
        await apiClient.post(`/api/v1/chat/read/${conversationId}/${myUserId}`);
      }
    } catch (error) {
      Logger.error('Failed to mark messages as read:', error);
    }
  }


  private getConversationId(u1: string, u2: string): string {
    return u1 < u2 ? `${u1}_${u2}` : `${u2}_${u1}`;
  }
}

export const chatService = new ChatService();
