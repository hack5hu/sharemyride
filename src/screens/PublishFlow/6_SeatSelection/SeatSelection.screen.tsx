import React from 'react';
import { SeatSelectionTemplate } from '@/components/templates/SeatSelectionTemplate/SeatSelectionTemplate';
import { useSeatSelection } from './useSeatSelection';

export const SeatSelectionScreen: React.FC = () => {
  const {
    flow,
    selectedSeats,
    vehicleType,
    seatIdsLabel,
    handleSeatPress,
    handleVehicleTypeChange,
    handleBackPress,
    handleContinue,
    t,
  } = useSeatSelection();

  return (
    <SeatSelectionTemplate
      flow={flow}
      selectedSeats={selectedSeats}
      vehicleType={vehicleType}
      seatIdsLabel={seatIdsLabel}
      onSeatPress={handleSeatPress}
      onVehicleTypeChange={handleVehicleTypeChange}
      onBackPress={handleBackPress}
      onContinue={handleContinue}
      t={t}
    />
  );
};
