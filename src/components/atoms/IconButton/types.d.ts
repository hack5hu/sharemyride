import { ViewStyle } from 'react-native';

export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonVariant = 'primary' | 'surface' | 'secondary';

export interface IconButtonProps {
  icon: string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  onPress?: () => void;
  style?: ViewStyle;
}
