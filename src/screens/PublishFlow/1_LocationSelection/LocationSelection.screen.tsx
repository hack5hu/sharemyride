import React from 'react';
import { LocationSelectionTemplate } from '@/components/templates/LocationSelectionTemplate';
import { useLocationSelection } from './useLocationSelection';
import { BottomNav } from '@/components/organisms/BottomNav';

export const LocationSelectionScreen: React.FC = () => {
  const {
    startLocationName,
    destinationLocationName,
    handlePressStart,
    handlePressDestination,
    handleContinue,
    canContinue,
  } = useLocationSelection();



  return (
    <LocationSelectionTemplate
      startLocationName={startLocationName}
      destinationLocationName={destinationLocationName}
      onPressStart={handlePressStart}
      onPressDestination={handlePressDestination}
      onPressContinue={handleContinue}
      canContinue={canContinue}
      navBar={
        <BottomNav activeTab={ 'PUBLISH'} />
      }
    />

  );
};
