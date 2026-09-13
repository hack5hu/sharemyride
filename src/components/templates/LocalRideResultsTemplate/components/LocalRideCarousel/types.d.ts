import { type LocalRideItemData } from '../LocalRideCard/types.d';

export interface LocalRideCarouselProps {
  rides: LocalRideItemData[];
  selectedRideId: string | null;
  onSelectRide: (rideId: string) => void;
  onPressDetails: (rideId: string) => void;
  onRequestPartner?: () => void;
  bottomInset?: number;
}
