import { type RouteProp } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';
import { type RootStackParamList } from '@/navigation/types.d';

export type CancelRideScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CancelRide'>;
  route: RouteProp<RootStackParamList, 'CancelRide'>;
};
