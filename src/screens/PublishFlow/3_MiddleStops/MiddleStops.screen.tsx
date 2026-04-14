import React from 'react';
import { MiddleStopsTemplate } from '@/components/templates/MiddleStopsTemplate';
import { useMiddleStops } from './useMiddleStops';

export const MiddleStopsScreen: React.FC = () => {
  const {
    startLocation,
    destination,
    middleStops,
    startLocationRaw,
    destinationLocationRaw,
    middleStopsRaw,
    handleBackPress,
    handleAddStop,
    handleRemoveStop,
    handleContinuePress,
  } = useMiddleStops();

  return (
    <MiddleStopsTemplate
      onBackPress={handleBackPress}
      onContinuePress={handleContinuePress}
      startLocation={startLocation}
      destination={destination}
      middleStops={middleStops}
      startLocationRaw={startLocationRaw}
      destinationLocationRaw={destinationLocationRaw}
      middleStopsRaw={middleStopsRaw}
      onAddStop={handleAddStop}
      onRemoveStop={handleRemoveStop}
    />
  );
};
