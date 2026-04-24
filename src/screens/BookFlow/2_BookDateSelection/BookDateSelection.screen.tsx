import React from 'react';
import { DateSelectionTemplate } from '@/components/templates/DateSelectionTemplate';
import { useBookDateSelection } from './useBookDateSelection';

export const BookDateSelectionScreen: React.FC = () => {
  const {
    months,
    selectedDate,
    handleBackPress,
    handleSelectDate,
  } = useBookDateSelection();

  return (
    <DateSelectionTemplate
      onBackPress={handleBackPress}
      months={months}
      selectedDate={selectedDate}
      onSelectDate={handleSelectDate}
    />
  );
};
