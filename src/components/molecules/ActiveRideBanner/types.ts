import { ActiveRideRole } from '@/navigation/types.d';

export interface ActiveRideBannerProps {
  title?: string;
  subtitle?: string;
  etaMinutes?: number;
  distanceKm?: number;
  role?: ActiveRideRole | 'DRIVER' | 'PASSENGER';
  onPress: () => void;
}
