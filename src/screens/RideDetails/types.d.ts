import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';

export type RideDetailsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'RideDetails'>;
  route: RouteProp<RootStackParamList, 'RideDetails'>;
};
