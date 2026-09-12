import React from 'react';
import { DateSelectionTemplate } from '@/components/templates/DateSelectionTemplate';
import { useBookDateSelection } from './useBookDateSelection';

export const BookDateSelectionScreen: React.FC = () => {
  const {
    months,
    selectedDates,
    selectedDate,
    handleBackPress,
    handleSelectDate,
    handleContinue,
  } = useBookDateSelection();

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
