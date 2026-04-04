export interface DriverProfileSummaryProps {
  name: string;
  rating?: number;
  totalRides?: string;
  vehicleInfo?: string;
  avatarUri: string;
  isVerified?: boolean;
  price?: string;
  variant?: 'bento' | 'upcoming';
}
