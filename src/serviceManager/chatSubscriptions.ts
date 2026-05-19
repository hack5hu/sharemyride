import { Client, IMessage } from '@stomp/stompjs';
import { MessageStatus, MessageType } from '@/constants/enums';
import { useChatStore } from '@/store/useChatStore';
import { ChatMessage } from '@/types/chat';
import { Logger } from '@/utils/logger';

interface IncomingMessage {
  messageId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp?: number;
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

const findConversationWithMessage = (
  messages: Record<string, ChatMessage[]>,
  messageId: string,
): string => Object.keys(messages).find(convId =>
  messages[convId].some(message => message.messageId === messageId),
) || '';

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

const syncActiveConversation = (
  userId: string,
  fetchHistory: ChatSubscriptionCallbacks['fetchHistory'],
) => {
  const { activeConversationId } = useChatStore.getState();
  if (!activeConversationId) {
    return;
  }

  const [u1, u2] = activeConversationId.split('_');
  const otherUser = u1 === userId ? u2 : u1;
  if (otherUser) {
    fetchHistory(userId, otherUser);
  }
};

export const registerChatSubscriptions = (
  client: Client,
  userId: string,
  callbacks: ChatSubscriptionCallbacks,
) => {
  client.subscribe('/user/queue/messages', (msg: IMessage) => {
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
      timestamp: data.timestamp || Date.now(),
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

  client.subscribe('/user/queue/status', (msg: IMessage) => {
    const data = parseMessage<StatusMessage>(msg);
    if (!data) return;

    const { messages, updateMessageStatus } = useChatStore.getState();
    const foundConvId = findConversationWithMessage(messages, data.messageId);

    if (foundConvId) {
      updateMessageStatus(foundConvId, data.messageId, data.status);
    } else if (!linkPendingMessage(data)) {
      syncActiveConversation(userId, callbacks.fetchHistory);
    }
  });
};
