export interface MatchedRideBentoProps {
  driverName: string;
  rating: number;
  totalRides: string;
  avatarUri: string;
  pickup: string;
  dropoff: string;
  onAccept: () => void;
  onPress?: () => void;
}

