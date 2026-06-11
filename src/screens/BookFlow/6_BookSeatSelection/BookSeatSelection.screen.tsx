import React from 'react';
import { BookSeatSelectionTemplate } from '@/components/templates/BookSeatSelectionTemplate/BookSeatSelectionTemplate';
import { useBookSeatSelection } from './useBookSeatSelection';
import { BookSeatSelectionProps } from './types';
import { useTranslation } from '@/hooks/useTranslation';

export const BookSeatSelectionScreen: React.FC<BookSeatSelectionProps> = React.memo(({ route }) => {
  const { 
    rideId,
    sourceStopId, 
    destinationStopId, 
    seats, 
    passengers: routePassengers,
    vehicleType: routeVehicleType,
    departureDate: routeDate,
    departureTime: routeTime
  } = route.params;

  const {
    rows,
    selectedSeats,
    occupiedSeats,
    prices,
    totalPrice,
    seatCount,
    vehicleType,
    toggleSeat,
    handleBack,
    handleConfirm,
    driverName,
    vehicleRegistration,
    departureDate,
    departureTime,
    passengers,
    isBooking,
  } = useBookSeatSelection(
    rideId, 
    sourceStopId, 
    destinationStopId, 
    seats, 
    routePassengers,
    routeVehicleType,
    routeDate,
    routeTime
  );

  const { t, translations } = useTranslation();
  const st = translations.selectSeat;
  const isDisabled = seatCount === 0;

  return (
    <BookSeatSelectionTemplate
      t={t}
      st={st}
      rows={rows}
      selectedSeats={selectedSeats}
      occupiedSeats={occupiedSeats}
      prices={prices}
      totalPrice={totalPrice}
      seatCount={seatCount}
      vehicleType={vehicleType}
      toggleSeat={toggleSeat}
      handleBack={handleBack}
      handleConfirm={handleConfirm}
      driverName={driverName}
      vehicleRegistration={vehicleRegistration}
      departureDate={departureDate}
      departureTime={departureTime}
      passengers={passengers}
      isBooking={isBooking}
      isDisabled={isDisabled}
    />
  );
});
