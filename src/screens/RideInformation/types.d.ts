import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types.d';

export type RideInformationScreenRouteProp = RouteProp<RootStackParamList, 'RideInformation'>;

export interface RideInformationProps {
  route: RideInformationScreenRouteProp;
}
