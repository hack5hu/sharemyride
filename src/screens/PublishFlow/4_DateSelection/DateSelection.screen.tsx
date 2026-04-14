import React from 'react';
import { DateSelectionTemplate } from '@/components/templates/DateSelectionTemplate';
import { useDateSelection } from './useDateSelection';

export const DateSelectionScreen: React.FC = () => {
  const {
    months,
    selectedDate,
    handleBackPress,
    handleSelectDate,
    handleNextPress,
  } = useDateSelection();

  return (
    <DateSelectionTemplate
      onBackPress={handleBackPress}
      onNextPress={handleNextPress}
      months={months}
      selectedDate={selectedDate}
      onSelectDate={handleSelectDate}
    />
  );
};
