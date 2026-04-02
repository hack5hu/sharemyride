import { MessageItemProps } from '@/components/molecules/MessageItem';

export interface RecentMessagesSectionProps {
  messages: MessageItemProps[];
  onMessagePress: (id: string) => void;
}
