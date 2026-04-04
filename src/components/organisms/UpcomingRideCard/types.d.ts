export interface UpcomingRideCardProps {
  timerLabel: string;
  driverName: string;
  carModel: string;
  rating: number;
  price: string;
  avatarUri: string;
  isVerified?: boolean;
  pickupTime: string;
  pickupLocation: string;
  dropoffTime: string;
  dropoffLocation: string;
  onMorePress: () => void;
  onPress?: () => void;
}

