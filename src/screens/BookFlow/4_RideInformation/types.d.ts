import { type RouteProp } from '@react-navigation/native';
import { type RootStackParamList } from '@/navigation/types.d';

export type RideInformationScreenRouteProp = RouteProp<
  RootStackParamList,
  'RideInformation'
>;

export interface RideInformationProps {
  route: RideInformationScreenRouteProp;
}
