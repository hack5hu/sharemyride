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
  type: 'text' | 'location' | 'image';
  metadata?: any;
}

export interface SendMessagePayload {
  senderId: string;
  receiverId: string;
  content: string;
  type?: string;
  metadata?: any;
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
  metadata?: any;
}

export interface UserProfile {
  userId: string;
  name: string;
  avatarUri?: string;
  rating?: number;
  isVerified?: boolean;
}
