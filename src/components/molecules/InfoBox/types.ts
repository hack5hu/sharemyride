import { type ReactNode } from 'react';
import { type ViewStyle } from 'react-native';

export interface InfoBoxProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}
