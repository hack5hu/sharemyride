import { type ReactNode } from 'react';
import { type MessageStatusVariant } from '@/components/atoms/MessageStatus';

export interface MessageBubbleProps {
  content: string | ReactNode;
  timestamp: string;
  isSender: boolean;
  status?: MessageStatusVariant;
  showTail?: boolean;
  onPress?: () => void;
}
