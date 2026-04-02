export type MessageStatusVariant = 'sent' | 'delivered' | 'read' | 'pending';

export interface MessageStatusProps {
  status: MessageStatusVariant;
  color?: string;
}
