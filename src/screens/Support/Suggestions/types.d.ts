import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';

export type SuggestionsScreenRouteProp = RouteProp<
  RootStackParamList,
  'Suggestions'
>;

export interface SuggestionsScreenProps {
  route: SuggestionsScreenRouteProp;
}
