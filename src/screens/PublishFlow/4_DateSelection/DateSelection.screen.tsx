import React from 'react';
import { DateSelectionTemplate } from '@/components/templates/DateSelectionTemplate';
import { useDateSelection } from './useDateSelection';

export const DateSelectionScreen: React.FC = () => {
  const {
    months,
    selectedDates,
    selectedDate,
    handleBackPress,
    handleSelectDate,
    handleContinue,
  } = useDateSelection();

  return (
    <DateSelectionTemplate
      onBackPress={handleBackPress}
      months={months}
      selectedDates={selectedDates}
      selectedDate={selectedDate}
      onSelectDate={handleSelectDate}
      onContinue={handleContinue}
    />
  );
};
