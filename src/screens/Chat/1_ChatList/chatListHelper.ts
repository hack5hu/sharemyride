import {
  type ChatConversation,
  type ChatMessage,
  type ChatMetadata,
  type UserProfile,
} from '@/types/chat';

export interface ChatListItemData {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isLastMessageFromMe: boolean;
  lastMessageStatus?: string;
  source?: string;
  destination?: string;
  isOnline: boolean;
  isVerified: boolean;
  avatarSource?: { uri: string };
  rating: number;
  rideId?: string;
  rideInfo?: unknown;
}

export const mapConversationToListItem = (
  conv: ChatConversation,
  myUserId: string,
  storeMessages: Record<string, ChatMessage[]>,
  users: Record<string, UserProfile>,
  t: (key: string) => string,
): ChatListItemData | null => {
  const convMessages = storeMessages[conv.conversationId] || [];
  let lastMsg = conv.lastMessage;
  const lastLocalMsg =
    convMessages.length > 0 ? convMessages[convMessages.length - 1] : null;

  if (lastLocalMsg && conv.lastMessage) {
    if (lastLocalMsg.timestamp > (conv.lastMessage.timestamp || 0)) {
      lastMsg = lastLocalMsg;
    } else if (lastLocalMsg.content === conv.lastMessage.content) {
      lastMsg = lastLocalMsg;
    }
  }

  if (!lastMsg) return null;

  const otherParticipantId = conv.participants.find(p => p !== myUserId);
  if (!otherParticipantId || otherParticipantId === 'Unknown') return null;

  const cachedUser = users[otherParticipantId];
  const metadata: ChatMetadata = conv.metadata || lastMsg.metadata || {};

  const name = String(
    cachedUser?.name ||
      metadata.userName ||
      metadata.name ||
      `User ${otherParticipantId.slice(0, 8)}`,
  );

  const lastMessageText = String(
    lastMsg.type === 'location' ||
      lastMsg.content.startsWith('[LOCATION_DATA]:')
      ? t('chat.locationShared')
      : lastMsg.content,
  );

  const time = new Date(lastMsg.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const avatarUri =
    metadata.avatarUri || metadata.userAvatar || cachedUser?.avatarUri;

  return {
    id: otherParticipantId,
    name,
    lastMessage: lastMessageText,
    time,
    unreadCount: lastMsg.senderId === myUserId ? 0 : conv.unreadCount,
    isLastMessageFromMe: lastMsg.senderId === myUserId,
    lastMessageStatus: lastMsg.status,
    source: metadata.pickup || metadata.source,
    destination: metadata.dropoff || metadata.destination,
    isOnline: true,
    isVerified: cachedUser?.isVerified ?? metadata.isVerified ?? true,
    avatarSource: avatarUri ? { uri: avatarUri } : undefined,
    rating: Number(
      cachedUser?.rating || metadata.userRating || metadata.rating || 5.0,
    ),
    rideId: metadata.rideId,
    rideInfo: metadata.rideInfo,
  };
};
