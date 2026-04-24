import { RideData } from '@/screens/BookFlow/3_AvailableRides/types';

export interface RideInformationTemplateProps {
  ride: RideData;
  t: any;
  handleBack: () => void;
  handleBook: () => void;
  handleViewRoute: () => void;
  handleCopyAddress: (address: string) => void;
}
