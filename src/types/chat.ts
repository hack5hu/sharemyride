import { MessageType } from '@/constants/enums';

export type ChatMessageType = MessageType | 'text' | 'location' | 'image';

export interface LocationMetadata {
  latitude: number;
  longitude: number;
  locationName?: string;
  address?: string;
  arrivingIn?: string;
  imageUri?: string;
}

export interface ChatMetadata {
  userName?: string;
  userAvatar?: string;
  avatarUri?: string;
  userRating?: number;
  rating?: number;
  isVerified?: boolean;
  pickup?: string;
  start?: string;
  dropoff?: string;
  destination?: string;
  rideId?: string;
  rideInfo?: unknown;
  location?: LocationMetadata;
  [key: string]: unknown;
}

export type MessageStatus =
  | 'SENT'
  | 'DELIVERED'
  | 'READ'
  | 'PENDING'
  | 'FAILED';

export interface ChatMessage {
  messageId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
  status: MessageStatus;
  type: ChatMessageType;
  metadata?: ChatMetadata;
}

export interface SendMessagePayload {
  senderId: string;
  receiverId: string;
  content: string;
  type?: ChatMessageType;
  metadata?: ChatMetadata;
}

export interface UpdateStatusPayload {
  messageId: string;
  status: MessageStatus;
  userId: string;
}

export interface ChatConversation {
  conversationId: string;
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  updatedAt: number;
  metadata?: ChatMetadata;
}

export interface UserProfile {
  userId: string;
  name: string;
  avatarUri?: string;
  rating?: number;
  isVerified?: boolean;
}
