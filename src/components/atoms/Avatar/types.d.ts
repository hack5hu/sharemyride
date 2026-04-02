import { ViewStyle, ImageSourcePropType } from 'react-native';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  source?: ImageSourcePropType;
  size?: AvatarSize;
  border?: boolean;
  placeholder?: string;
  style?: ViewStyle;
  status?: 'online' | 'offline' | 'none';
  isVerified?: boolean;
}
