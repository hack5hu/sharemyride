import { DriverStop, DriverStopStatus } from '@/components/molecules/StopItemCard';
export { DriverStop, DriverStopStatus };

export interface NextStopInfo {
  passengerName: string;
  distanceKm: number;
  etaMinutes: number;
}

export interface DriverVehicleInfo {
  model: string;
  licensePlate?: string;
  batteryPercentage: number;
}

export interface GroupedStop {
  stopId: string | number;
  stopName: string;
  passengers: DriverStop[];
}

export interface ActiveRideDriverTemplateProps {
  onBack: () => void;
  nextStop: NextStopInfo;
  isLiveLocationEnabled: boolean;
  onToggleLiveLocation: (enabled: boolean) => void;
  groupedStops: GroupedStop[];
  vehicleInfo: DriverVehicleInfo;
  onChatPress: (stop: DriverStop) => void;
  onCallPress: (stop: DriverStop) => void;
  onSafetyCenterPress: () => void;
}
