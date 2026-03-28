import { ReactNode } from 'react';
import { TouchableOpacityProps, ViewStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  children: ReactNode;
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
}
