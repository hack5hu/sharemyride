import { RideData } from '@/screens/AvailableRides/types.d';

export interface RideInformationTemplateProps {
  ride: RideData;
  t: any;
  handleBack: () => void;
  handleBook: () => void;
}
