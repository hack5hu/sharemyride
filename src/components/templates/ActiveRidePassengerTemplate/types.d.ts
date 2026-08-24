import { DriverDetails } from '@/components/molecules/DriverCardSection';
import { PassengerTimelineItem } from '@/components/molecules/TimelineStopItem';

export { DriverDetails, PassengerTimelineItem };

export interface ActiveRidePassengerTemplateProps {
  onBack: () => void;
  etaMinutes: number;
  distanceKm: number;
  isLiveLocationEnabled: boolean;
  onToggleLiveLocation: (enabled: boolean) => void;
  driver: DriverDetails;
  timeline: PassengerTimelineItem[];
  onChatPress: () => void;
  onCallPress: () => void;
  onSafetyCenterPress: () => void;
  nextStopName: string;
}
