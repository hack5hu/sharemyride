import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';

export type CancelRideScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CancelRide'>;
  route: RouteProp<RootStackParamList, 'CancelRide'>;
};
