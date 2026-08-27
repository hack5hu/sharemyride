import { DriverStop, DriverStopStatus } from '@/components/molecules/StopItemCard';
export { DriverStop, DriverStopStatus };

export interface NextStopInfo {
  passengerName: string;
  distanceKm: number;
  etaMinutes: number;
}

export interface DriverVehicleInfo {
  company: string;
  model: string;
  licensePlate?: string;
  color?: string;
  fuelType?: string;
  batteryPercentage?: number;
  type?: string;
}

export interface GroupedStop {
  stopId: string | number;
  stopName: string;
  lat?: number;
  lon?: number;
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
  onCopyLocation?: (address: string) => void;
  onOpenMap?: (lat?: number, lon?: number, address?: string) => void;
}
