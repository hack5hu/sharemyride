import React from 'react';
import { SeatSelectionTemplate } from '@/components/templates/SeatSelectionTemplate';
import { useSeatSelection } from './useSeatSelection';

export const SeatSelectionScreen: React.FC = () => {
  const {
    vehicleType,
    selectedSeats,
    estEarnings,
    handleVehicleTypeChange,
    handleSeatPress,
    handleBackPress,
    handleContinue,
  } = useSeatSelection();

  return (
    <SeatSelectionTemplate
      vehicleType={vehicleType}
      selectedSeats={selectedSeats}
      estEarnings={estEarnings}
      onVehicleTypeChange={handleVehicleTypeChange}
      onSeatPress={handleSeatPress}
      onBackPress={handleBackPress}
      onContinue={handleContinue}
    />
  );
};
