import { Client, IMessage } from '@stomp/stompjs';
import { MessageStatus, MessageType } from '@/constants/enums';
import { useChatStore, getConversationIdForMessage } from '@/store/useChatStore';
import { ChatMessage } from '@/types/chat';
import { Logger } from '@/utils/logger';
import { parseChatTimestamp } from '@/utils/date';

interface IncomingMessage {
  messageId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp?: number;
  createdAt?: string;
  type?: MessageType;
  metadata?: Record<string, unknown>;
}

interface StatusMessage {
  messageId: string;
  status: MessageStatus;
}

interface ChatSubscriptionCallbacks {
  getConversationId: (u1: string, u2: string) => string;
  updateStatus: (messageId: string, status: MessageStatus, userId: string) => void;
  markAsRead: (myUserId: string, otherUserId: string) => void;
  fetchHistory: (myUserId: string, otherUserId: string) => void;
}

const parseMessage = <T>(msg: IMessage): T | null => {
  try {
    return JSON.parse(msg.body) as T;
  } catch (error) {
    Logger.error('Failed to parse socket payload:', error);
    return null;
  }
};

const linkPendingMessage = (data: StatusMessage): boolean => {
  const { messages, linkPendingMessage: linkMessage } = useChatStore.getState();

  for (const convId of Object.keys(messages)) {
    const pendingMessage = [...messages[convId]]
      .reverse()
      .find(message =>
        message.messageId.startsWith('temp-') &&
        message.status === MessageStatus.PENDING,
      );

    if (pendingMessage) {
      linkMessage(convId, pendingMessage.messageId, data.messageId, data.status);
      return true;
    }
  }

  return false;
};

// Track active subscriptions to avoid duplicates on reconnection
let activeSubscriptions: { unsubscribe: () => void }[] = [];
let statusUpdateQueue: { conversationId: string; messageId: string; status: MessageStatus }[] = [];
let statusUpdateTimeout: any = null;

function processStatusUpdateQueue() {
  const { updateMultipleMessageStatuses } = useChatStore.getState();
  
  const groups: Record<string, { messageId: string; status: MessageStatus }[]> = {};
  statusUpdateQueue.forEach(item => {
    if (!groups[item.conversationId]) {
      groups[item.conversationId] = [];
    }
    groups[item.conversationId].push({ messageId: item.messageId, status: item.status });
  });

  Object.keys(groups).forEach(convId => {
    updateMultipleMessageStatuses(convId, groups[convId]);
  });

  statusUpdateQueue = [];
  statusUpdateTimeout = null;
}

function queueStatusUpdate(conversationId: string, messageId: string, status: MessageStatus) {
  statusUpdateQueue.push({ conversationId, messageId, status });
  if (!statusUpdateTimeout) {
    statusUpdateTimeout = setTimeout(processStatusUpdateQueue, 0);
  }
}

export const registerChatSubscriptions = (
  client: Client,
  userId: string,
  callbacks: ChatSubscriptionCallbacks,
) => {
  // Unsubscribe from any existing subscriptions to prevent duplicate event listeners
  activeSubscriptions.forEach((sub) => {
    try {
      sub.unsubscribe();
    } catch (e) {
      Logger.warn('[Socket] Failed to unsubscribe:', e);
    }
  });
  activeSubscriptions = [];

  const msgSub = client.subscribe('/user/queue/messages', (msg: IMessage) => {
    const data = parseMessage<IncomingMessage>(msg);
    if (!data) return;

    const conversationId = callbacks.getConversationId(data.senderId, data.receiverId);
    const { activeConversationId, addMessage } = useChatStore.getState();
    const isFromOther = data.senderId !== userId;
    const isRead = isFromOther && activeConversationId === conversationId;
    const message: ChatMessage = {
      messageId: data.messageId,
      senderId: data.senderId,
      receiverId: data.receiverId,
      content: data.content,
      timestamp: parseChatTimestamp(data),
      status: isRead ? MessageStatus.READ : MessageStatus.DELIVERED,
      type: data.type || MessageType.TEXT,
      metadata: data.metadata,
    };

    addMessage(conversationId, message);

    if (isFromOther) {
      const status = isRead ? MessageStatus.READ : MessageStatus.DELIVERED;
      callbacks.updateStatus(data.messageId, status, userId);
      if (isRead) {
        callbacks.markAsRead(userId, data.senderId);
      }
    }
  });

  const statusSub = client.subscribe('/user/queue/status', (msg: IMessage) => {
    const data = parseMessage<StatusMessage>(msg);
    if (!data) return;

    const foundConvId = getConversationIdForMessage(data.messageId);
    if (foundConvId) {
      queueStatusUpdate(foundConvId, data.messageId, data.status);
    } else {
      linkPendingMessage(data);
    }
  });

  activeSubscriptions.push(msgSub, statusSub);
};
