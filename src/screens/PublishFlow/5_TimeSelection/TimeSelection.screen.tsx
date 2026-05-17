import React from 'react';
import { TimeSelectionTemplate } from '@/components/templates/TimeSelectionTemplate';
import { useTimeSelection } from './useTimeSelection';

export const TimeSelectionScreen: React.FC = () => {
  const {
    selectedHour,
    selectedMinute,
    minHour,
    minMinute,
    isContinueDisabled,
    handleHourChange,
    handleMinuteChange,
    handleBackPress,
    handleContinuePress,
  } = useTimeSelection();

  return (
    <TimeSelectionTemplate
      selectedHour={selectedHour}
      selectedMinute={selectedMinute}
      onHourChange={handleHourChange}
      onMinuteChange={handleMinuteChange}
      onBackPress={handleBackPress}
      onContinuePress={handleContinuePress}
      minHour={minHour}
      minMinute={minMinute}
      isContinueDisabled={isContinueDisabled}
    />
  );
};
