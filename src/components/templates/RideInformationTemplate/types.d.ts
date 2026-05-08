import { RideData } from '@/screens/BookFlow/3_AvailableRides/types';

export interface RideInformationTemplateProps {
  ride: RideData | null;
  t: any;
  handleBack: () => void;
  handleBook: () => void;
  handleViewRoute: (index?: number) => void;
  handleCopyAddress: (address: string) => void;
  handleChat: () => void;
  handleDriverProfile: () => void;
  isLoading?: boolean;
}
