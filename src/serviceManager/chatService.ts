import { Client } from '@stomp/stompjs';
import * as Keychain from 'react-native-keychain';
import { BASE_URL } from '@/constants/apiEndpoints';
import { useChatStore } from '@/store/useChatStore';
import { ChatMessage, SendMessagePayload } from '@/types/chat';
import {
  MessageStatus,
  MessageType,
  ConnectionStatus,
  NotificationType,
} from '@/constants/enums';
import axiosClient from './axiosClient';
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

class ChatServiceClass {
  async fetchUserProfile(userId: string) {
    return fetchChatUserProfile(userId);
  }

  private client: Client | null = null;
  private currentUserId: string | null = null;
  private retryCount: number = 0;
  private maxRetries: number = 3;
  private activeListeners: number = 0;
  private disconnectTimeout: any = null;

  async connect(userId: string) {
    this.activeListeners++;
    if (this.disconnectTimeout) {
      clearTimeout(this.disconnectTimeout);
      this.disconnectTimeout = null;
    }

    if (this.client?.active && this.currentUserId === userId) {
      Logger.log('[Socket] Already active for user:', userId);
      return;
    }

    // Reset retry count on explicit new connection request
    this.retryCount = 0;
    this.currentUserId = userId;
    const { setConnectionStatus, setMyUserId } = useChatStore.getState();

    setMyUserId(userId);
    setConnectionStatus(ConnectionStatus.CONNECTING);

    const brokerUrl = BASE_URL.replace('http', 'ws') + '/ws/websocket';
    const authCreds = await Keychain.getGenericPassword({
      service: 'auth_token',
    });
    if (!authCreds) {
      Logger.warn('[Socket] Missing auth token');
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
      return;
    }

    try {
      if (this.client) {
        try {
          this.client.deactivate();
        } catch {}
      }

      this.client = new Client({
        webSocketFactory: () => new WebSocket(brokerUrl),
        connectHeaders: {
          userId: userId,
          Authorization: `Bearer ${authCreds.password}`,
        },
        debug: (str) => { Logger.log('[STOMP Debug]:', str); },
        reconnectDelay: 15000, // 15s gentle interval instead of aggressive 5s polling
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
      });

      this.client.onWebSocketError = (evt) => {
        Logger.error('[Socket] WebSocket Error:', evt);
        this.handleConnectionFailure();
      };

      this.client.onWebSocketClose = (evt) => {
        Logger.warn('[Socket] WebSocket Closed:', evt);
        this.handleConnectionFailure();
      };

      this.client.onConnect = () => {
        Logger.log('[Socket] WebSocket connected successfully');
        this.retryCount = 0; // Reset retry counter on clean connection
        setConnectionStatus(ConnectionStatus.CONNECTED);
        registerChatSubscriptions(this.client as Client, userId, {
          getConversationId: this.getConversationId,
          updateStatus: this.updateStatus.bind(this),
          markAsRead: this.markAsRead.bind(this),
          fetchHistory: this.fetchHistory.bind(this),
        });
        this.resendPendingMessages();
      };

      this.client.onDisconnect = () => {
        setConnectionStatus(ConnectionStatus.DISCONNECTED);
      };

      this.client.onStompError = frame => {
        Logger.warn('[Socket] STOMP Error:', frame.headers.message);
        this.handleConnectionFailure();
      };

      Logger.log('[Socket] Activating STOMP client with URL:', brokerUrl);
      this.client.activate();
    } catch (error) {
      Logger.warn('[Socket] Initialization failed:', error);
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    }
  }

  private handleConnectionFailure() {
    this.retryCount++;
    const { setConnectionStatus } = useChatStore.getState();

    if (this.retryCount >= this.maxRetries) {
      Logger.log(
        `[Socket] Circuit breaker triggered after ${this.retryCount} failed connection attempts. Pausing auto-reconnect to protect server & device battery.`,
      );
      if (this.client) {
        try {
          this.client.deactivate();
        } catch {}
      }
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    } else {
      setConnectionStatus(ConnectionStatus.CONNECTING);
    }
  }

  disconnect() {
    this.activeListeners = Math.max(0, this.activeListeners - 1);
    if (this.activeListeners === 0) {
      if (this.disconnectTimeout) {
        clearTimeout(this.disconnectTimeout);
      }
      this.disconnectTimeout = setTimeout(() => {
        if (this.activeListeners === 0) {
          this.performDisconnect();
        }
      }, 500); // 500ms delay before actually tearing down
    }
  }

  public performDisconnect() {
    this.retryCount = 0;
    if (this.client) {
      try {
        this.client.deactivate();
      } catch {}
      this.client = null;
      useChatStore
        .getState()
        .setConnectionStatus(ConnectionStatus.DISCONNECTED);
    }
  }

  sendMessage(payload: SendMessagePayload) {
    const conversationId = this.getConversationId(
      payload.senderId,
      payload.receiverId,
    );
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
      showNotification(
        NotificationType.ERROR,
        t.chat.sendFailedTitle,
        t.chat.sendFailedMessage,
      );
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
      showNotification(
        NotificationType.ERROR,
        t.chat.sendFailedTitle,
        t.chat.sendFailedMessage,
      );
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

  resendPendingMessages() {
    const { messages } = useChatStore.getState();
    Object.keys(messages).forEach(conversationId => {
      const pending = (messages[conversationId] || []).filter(
        m => m.status === MessageStatus.PENDING || m.status === MessageStatus.FAILED,
      );
      pending.forEach(m => {
        this.resendMessage(conversationId, m.messageId);
      });
    });
  }

  async syncConversations(userId: string) {
    try {
      const data = await this.fetchConversations(0, 20);
      if (data) {
        let content = [];
        if (Array.isArray(data)) {
          content = data;
        } else if (data.content && Array.isArray(data.content)) {
          content = data.content;
        }
        if (content.length > 0) {
          const { messages: localMessages } = useChatStore.getState();
          const mappedConversations = content.map((item: any) => {
            const convId = item.conversationId || item.id;
            const otherId = item.otherUserId || item.id;
            const convMessages = localMessages[convId] || [];
            const lastLocalMsg = convMessages.length > 0 ? convMessages[convMessages.length - 1] : null;

            const isMe =
              item.lastMessageSenderId === userId ||
              item.lastSenderId === userId ||
              item.senderId === userId ||
              item.isLastMessageFromMe === true ||
              item.isFromMe === true ||
              (lastLocalMsg && lastLocalMsg.senderId === userId);

            const lastSender = isMe ? userId : otherId;
            const lastReceiver = isMe ? otherId : userId;

            return {
              conversationId: convId,
              participants: [userId, otherId],
              unreadCount: isMe ? 0 : (item.unreadCount || 0),
              updatedAt: item.lastMessageTime ? parseChatTimestamp({ timestamp: item.lastMessageTime }) : 0,
              metadata: {
                name: item.otherUserName || item.name,
                avatarUri: item.otherUserPhoto || item.photo,
              },
              lastMessage: lastLocalMsg || {
                messageId: `preview-${convId}`,
                senderId: lastSender,
                receiverId: lastReceiver,
                content: item.lastMessagePreview || item.lastMessage?.content || '',
                timestamp: item.lastMessageTime ? parseChatTimestamp({ timestamp: item.lastMessageTime }) : 0,
                status: (item.lastMessageStatus || 'SENT').toUpperCase() as MessageStatus,
                type: 'text',
              },
            };
          });
          useChatStore.getState().setConversations(mappedConversations);
        }
      }
    } catch (error) {
      Logger.error('Failed to sync conversations on app state change:', error);
    }
  }

  async fetchConversations(page: number = 0, size: number = 20) {
    try {
      const response = await axiosClient.get(
        `/api/v1/chat/conversations?page=${page}&size=${size}`,
      );
      return response.data;
    } catch (error) {
      Logger.error('Failed to fetch conversations:', error);
      return null;
    }
  }

  async fetchHistory(myUserId: string, otherUserId: string, page: number = 0, size: number = 30) {
    const conversationId = this.getConversationId(myUserId, otherUserId);
    try {
      const response = await axiosClient.get(
        `/api/v1/chat/messages/${otherUserId}?page=${page}&size=${size}`,
      );
      
      let content = [];
      let isLast = false;
      const data = response.data;
      
      if (Array.isArray(data)) {
        content = data;
        isLast = data.length < size;
      } else if (data.content && Array.isArray(data.content)) {
        content = data.content;
        isLast = data.last ?? (content.length < size);
      }

      const history = content.map((m: any) => ({
        ...m,
        status: (
          m.status ||
          m.messageStatus ||
          MessageStatus.SENT
        ).toUpperCase() as MessageStatus,
        timestamp: parseChatTimestamp(m),
      }));
      
      useChatStore.getState().setHistory(conversationId, history);
      return { history, isLast };
    } catch (error) {
      Logger.error('Failed to fetch chat history:', error);
      return { history: [], isLast: true };
    }
  }

  async markAsRead(myUserId: string, otherUserId: string) {
    const conversationId = this.getConversationId(myUserId, otherUserId);
    try {
      // Local-first: reset count immediately
      const {
        markConversationAsRead,
        messages,
        updateMultipleMessageStatuses,
      } = useChatStore.getState();
      markConversationAsRead(conversationId);

      // Refresh local status of all messages immediately (Optimistic Update)
      const chatMessages = messages[conversationId] || [];
      const updates = chatMessages
        .filter(
          m => m.receiverId === myUserId && m.status !== MessageStatus.READ,
        )
        .map(m => ({ messageId: m.messageId, status: MessageStatus.READ }));

      if (updates.length > 0) {
        updateMultipleMessageStatuses(conversationId, updates);
        await axiosClient.post(`/api/v1/chat/read/${conversationId}/${myUserId}`);
      }
    } catch (error) {
      Logger.error('Failed to mark messages as read:', error);
    }
  }

  public getConversationId(u1: string, u2: string): string {
    return u1 < u2 ? `${u1}_${u2}` : `${u2}_${u1}`;
  }
}

export const ChatService = new ChatServiceClass();
