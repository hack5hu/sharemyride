import React from 'react';
import { BookingConfirmedTemplate } from '@/components/templates/BookingConfirmedTemplate';
import { useBookingConfirmed } from './useBookingConfirmed';

export const BookingConfirmedScreen: React.FC = React.memo(() => {
  const {
    t,
    rideData,
    handleGoToMyRides,
    handleShareDetails,
    handleMenuPress,
  } = useBookingConfirmed();

  return (
    <BookingConfirmedTemplate
      t={t}
      rideData={rideData}
      handleGoToMyRides={handleGoToMyRides}
      handleShareDetails={handleShareDetails}
      handleMenuPress={handleMenuPress}
    />
  );
});
