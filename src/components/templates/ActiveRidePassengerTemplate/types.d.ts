import { DriverDetails } from '@/components/molecules/DriverCardSection';
import { PassengerTimelineItem } from '@/components/molecules/TimelineStopItem';
import { DriverVehicleInfo } from '@/components/templates/ActiveRideDriverTemplate/types.d';

export { DriverDetails, PassengerTimelineItem, DriverVehicleInfo };

export interface ActiveRidePassengerTemplateProps {
  onBack: () => void;
  etaMinutes: number;
  distanceKm: number;
  isLiveLocationEnabled: boolean;
  onToggleLiveLocation: (enabled: boolean) => void;
  driver: DriverDetails;
  vehicleInfo?: DriverVehicleInfo;
  timeline: PassengerTimelineItem[];
  onChatPress: () => void;
  onCallPress: () => void;
  onSafetyCenterPress: () => void;
  nextStopName: string;
  onCopyLocation?: (address: string) => void;
  onOpenMap?: (lat?: number, lon?: number, address?: string) => void;
}
