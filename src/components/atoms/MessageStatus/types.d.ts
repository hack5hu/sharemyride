export type MessageStatusVariant = 'sent' | 'delivered' | 'read' | 'pending' | 'failed';

export interface MessageStatusProps {
  status: MessageStatusVariant;
  color?: string;
}
