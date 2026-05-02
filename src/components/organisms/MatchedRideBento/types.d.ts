export interface MatchedRideBentoProps {
  driverName: string;
  rating: number;
  totalRides: string;
  avatarUri: string;
  pickup: string;
  dropoff: string;
  price?: string;
  seatCount?: number | string;
  date?: string;
  onAccept: () => void;
  onReject?: () => void;
  onPress?: () => void;
}

