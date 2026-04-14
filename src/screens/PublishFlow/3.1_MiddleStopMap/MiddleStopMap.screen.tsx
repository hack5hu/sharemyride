import React from 'react';
import { MiddleStopMapTemplate } from '@/components/templates/MiddleStopMapTemplate';
import { useMiddleStopMap } from './useMiddleStopMap';

export const MiddleStopMapScreen: React.FC = () => {
  const {
    isSearching,
    searchQuery,
    selectedLocation,
    routeTitle,
    suggestedLocations,
    recentHistory,
    handleBackPress,
    handleSearchPress,
    handleChangeSearch,
    handleSelectLocation,
    handleContinue,
  } = useMiddleStopMap();

  return (
    <MiddleStopMapTemplate
      isSearching={isSearching}
      searchQuery={searchQuery}
      selectedLocation={selectedLocation}
      routeTitle={routeTitle}
      suggestedLocations={suggestedLocations}
      recentHistory={recentHistory}
      onBackPress={handleBackPress}
      onSearchPress={handleSearchPress}
      onChangeSearch={handleChangeSearch}
      onSelectLocation={handleSelectLocation}
      onContinue={handleContinue}
    />
  );
};
