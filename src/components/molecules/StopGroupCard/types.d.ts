import { DriverStop } from '@/components/molecules/StopItemCard';
import { GroupedStop } from '@/components/templates/ActiveRideDriverTemplate/types.d';

export interface StopGroupCardProps {
  group: GroupedStop;
  groupIndex: number;
  onChatPress: (stop: DriverStop) => void;
  onCallPress: (stop: DriverStop) => void;
  onCopyLocation?: (address: string) => void;
  onOpenMap?: (lat?: number, lon?: number, address?: string) => void;
}
