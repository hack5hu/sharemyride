import { ViewStyle } from 'react-native';

export interface ToggleProps {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  style?: ViewStyle;
}
