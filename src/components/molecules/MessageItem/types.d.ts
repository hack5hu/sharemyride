import { type ViewStyle, type ImageSourcePropType } from 'react-native';
import { type MessageStatus } from '@/constants/enums';

export interface MessageItemProps {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatarSource?: ImageSourcePropType;
  unreadCount?: number;
  source: string;
  destination: string;
  isOnline?: boolean;
  isVerified?: boolean;
  isLastMessageFromMe?: boolean;
  lastMessageStatus?: MessageStatus;
  onPress?: () => void;
  style?: ViewStyle;
}
