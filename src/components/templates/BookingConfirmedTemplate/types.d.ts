import { type BookingConfirmedTranslations } from '@/constants/localization/types';

export interface ConfirmedRideData {
  driver: {
    avatar: string;
    name: string;
    rating: number | string;
    car: string;
  };
  pickupTime: string;
  departureDate?: string;
  seatNumber: string;
  seatPreference: string;
}

export interface BookingConfirmedTemplateProps {
  t: BookingConfirmedTranslations;
  rideData: ConfirmedRideData;
  handleGoToMyRides: () => void;
  handleShareDetails: () => void;
  handleMenuPress?: () => void;
}
