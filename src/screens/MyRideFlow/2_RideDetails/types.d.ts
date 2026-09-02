import { type RouteProp } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';
import { type RootStackParamList } from '@/navigation/types.d';

export type RideDetailsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'RideDetails'>;
  route: RouteProp<RootStackParamList, 'RideDetails'>;
};
