import { type RouteProp } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';
import { type RootStackParamList } from '@/navigation/types';

export type ChatDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChatDetails'
>;
export type ChatDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ChatDetails'
>;

export interface ChatDetailsScreenProps {
  navigation: ChatDetailsScreenNavigationProp;
  route: ChatDetailsScreenRouteProp;
}
