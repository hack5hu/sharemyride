import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';

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
