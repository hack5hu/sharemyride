import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types.d';
import {
  DriverStop,
  NextStopInfo,
  DriverVehicleInfo,
  GroupedStop,
} from '@/components/templates/ActiveRideDriverTemplate';
import {
  PassengerTimelineItem,
  DriverDetails,
} from '@/components/templates/ActiveRidePassengerTemplate';

export type ActiveRideRouteProp = RouteProp<
  RootStackParamList,
  'ActiveRide' | 'ActiveRideDriver' | 'ActiveRidePassenger'
>;

export interface UseActiveRideReturn {
  isPassenger: boolean;
  isLiveLocationEnabled: boolean;
  handleBack: () => void;
  handleToggleLiveLocation: (enabled: boolean) => void;
  handleSafetyCenterPress: () => void;
  // Driver specific
  nextStop: NextStopInfo;
  groupedStops: GroupedStop[];
  vehicleInfo: DriverVehicleInfo;
  handleDriverChatPress: (stop: DriverStop) => void;
  handleDriverCallPress: (stop: DriverStop) => void;
  // Passenger specific
  passengerEtaMinutes: number;
  passengerDistanceKm: number;
  driverDetails: DriverDetails;
  passengerTimeline: PassengerTimelineItem[];
  handlePassengerChatPress: () => void;
  handlePassengerCallPress: () => void;
  nextStopName: string;
  nextStopLat?: number;
  nextStopLon?: number;
  handleCopyLocation: (address: string) => void;
  handleOpenMap: (lat?: number, lon?: number, address?: string) => void;
}
