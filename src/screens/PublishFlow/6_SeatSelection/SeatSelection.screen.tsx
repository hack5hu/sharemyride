import React from 'react';
import { SeatSelectionTemplate } from '@/components/templates/SeatSelectionTemplate/SeatSelectionTemplate';
import { useSeatSelection } from './useSeatSelection';

export const SeatSelectionScreen: React.FC = () => {
  const {
    flow,
    selectedSeats,
    vehicleType,
    seatIdsLabel,
    onSeatPress,
    vehicles,
    selectedVehicleId,
    onVehicleSelect,
    onAddNewVehicle,
    onBackPress,
    onContinue,
    t,
  } = useSeatSelection();

  return (
    <SeatSelectionTemplate
      flow={flow}
      selectedSeats={selectedSeats}
      vehicleType={vehicleType}
      seatIdsLabel={seatIdsLabel}
      onSeatPress={onSeatPress}
      vehicles={vehicles}
      selectedVehicleId={selectedVehicleId}
      onVehicleSelect={onVehicleSelect}
      onAddNewVehicle={onAddNewVehicle}
      onBackPress={onBackPress}
      onContinue={onContinue}
      t={t}
    />
  );
};
