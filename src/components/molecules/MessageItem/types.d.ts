import { ViewStyle, ImageSourcePropType } from 'react-native';

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
  onPress?: () => void;
  style?: ViewStyle;
}
