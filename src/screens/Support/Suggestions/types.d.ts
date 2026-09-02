import { type RouteProp } from '@react-navigation/native';
import { type RootStackParamList } from '@/navigation/types';

export type SuggestionsScreenRouteProp = RouteProp<
  RootStackParamList,
  'Suggestions'
>;

export interface SuggestionsScreenProps {
  route: SuggestionsScreenRouteProp;
}
