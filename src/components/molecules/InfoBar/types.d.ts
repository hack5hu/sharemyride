import { ViewStyle } from 'react-native';

export type InfoBarVariant = 'info' | 'success' | 'error';

export interface InfoBarProps {
  title: string;
  subtitle?: string;
  variant?: InfoBarVariant;
  style?: ViewStyle;
}
