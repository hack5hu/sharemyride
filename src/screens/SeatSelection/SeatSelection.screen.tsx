import React from 'react';
import { SeatSelectionTemplate } from '@/components/templates/SeatSelectionTemplate/SeatSelectionTemplate';
import { useSeatSelection } from './useSeatSelection';

export const SeatSelectionScreen: React.FC = () => {
  const {
    flow,
    selectedSeats,
    moneyValue,
    seatIdsLabel,
    handleSeatPress,
    handleBackPress,
    handleContinue,
    t,
  } = useSeatSelection();

  return (
    <SeatSelectionTemplate
      flow={flow}
      selectedSeats={selectedSeats}
      moneyValue={moneyValue}
      seatIdsLabel={seatIdsLabel}
      onSeatPress={handleSeatPress}
      onBackPress={handleBackPress}
      onContinue={handleContinue}
      t={t}
    />
  );
};
