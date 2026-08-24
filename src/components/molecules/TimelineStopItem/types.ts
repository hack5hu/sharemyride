export interface PassengerTimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  avatar?: string;
  isCurrentUser?: boolean;
  isCompleted?: boolean;
  isPending?: boolean;
  isFinalDestination?: boolean;
}

export interface TimelineStopItemProps {
  item: PassengerTimelineItem;
  isLast: boolean;
}
