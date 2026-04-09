import React from 'react';
import { SeatSelectionTemplate } from '@/components/templates/SeatSelectionTemplate/SeatSelectionTemplate';
import { useSeatSelection } from './useSeatSelection';

export const SeatSelectionScreen: React.FC = () => {
  const {
    selectedSeats,
    handleSeatPress,
    handleBackPress,
    handleContinue,
  } = useSeatSelection();

  return (
    <SeatSelectionTemplate
      selectedSeats={selectedSeats}
      onSeatPress={handleSeatPress}
      onBackPress={handleBackPress}
      onContinue={handleContinue}
    />
  );
};
