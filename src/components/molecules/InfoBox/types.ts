import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface InfoBoxProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}
