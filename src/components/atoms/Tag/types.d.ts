import { ViewStyle } from 'react-native';

export interface TagProps {
  children: string;
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}
