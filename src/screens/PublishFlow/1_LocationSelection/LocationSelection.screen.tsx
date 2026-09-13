import React from 'react';
import { BottomNav } from '@/components/organisms/BottomNav';
import { LocationSelectionTemplate } from '@/components/templates/LocationSelectionTemplate';
import { useLocationSelection } from './useLocationSelection';

export const LocationSelectionScreen: React.FC = () => {
  const {
    startLocationName,
    destinationLocationName,
    handlePressStart,
    handlePressDestination,
    handleSwapLocations,
    handleContinue,
    canContinue,
    recentRides,
    handleSelectRecentRide,
  } = useLocationSelection();

  return (
    <LocationSelectionTemplate
      startLocationName={startLocationName}
      destinationLocationName={destinationLocationName}
      onPressStart={handlePressStart}
      onPressDestination={handlePressDestination}
      onSwapLocations={handleSwapLocations}
      onPressContinue={handleContinue}
      canContinue={canContinue}
      recentRides={recentRides}
      onSelectRecentRide={handleSelectRecentRide}
      navBar={<BottomNav activeTab={'PUBLISH'} />}
    />
  );
};
