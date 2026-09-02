import { type RouteProp } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';
import { type RootStackParamList } from '@/navigation/types.d';

export type UserRatingsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserRatings'
>;
export type UserRatingsRouteProp = RouteProp<
  RootStackParamList,
  'UserRatings'
>;

export interface UserRatingsScreenProps {
  navigation: UserRatingsNavigationProp;
  route: UserRatingsRouteProp;
}
