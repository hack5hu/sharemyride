export interface PassengerTimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  avatar?: string;
  isCurrentUser?: boolean;
  isCompleted?: boolean;
  isPending?: boolean;
  isFinalDestination?: boolean;
  lat?: number;
  lon?: number;
}

export interface TimelineStopItemProps {
  item: PassengerTimelineItem;
  isLast: boolean;
  onCopyLocation?: (address: string) => void;
  onOpenMap?: (lat?: number, lon?: number, address?: string) => void;
  copyLabel?: string;
  copiedLabel?: string;
  mapLabel?: string;
}
