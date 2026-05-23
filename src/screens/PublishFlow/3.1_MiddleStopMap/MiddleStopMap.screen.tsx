import React from 'react';
import { MiddleStopMapTemplate } from '@/components/templates/MiddleStopMapTemplate';
import { useMiddleStopMap } from './useMiddleStopMap';

export const MiddleStopMapScreen: React.FC = () => {
  const {
    isSearching,
    isLoading,
    isReverseGeocoding,
    isMoving,
    searchQuery,
    searchResults,
    selectedLocation,
    snapResult,
    canConfirm,
    routeTitle,
    distanceText,
    stopsCount,
    history,
    initialCenter,
    routeGeoJSON,
    connectorGeoJSON,
    routeBounds,
    routeCoordinates,
    mapRef,
    cameraRef,
    startLocation,
    destinationLocation,
    handleBackPress,
    handleSearchPress,
    handleChangeSearch,
    handleSelectLocation,
    handleSelectHistory,
    handleConfirm,
    handleZoomIn,
    handleZoomOut,
    handleRegionWillChange,
    handleRegionIsChanging,
    handleRegionChangeComplete,
    handleMapPress,
    isMapMounted,
  } = useMiddleStopMap();

  return (
    <MiddleStopMapTemplate
      isSearching={isSearching}
      isLoading={isLoading}
      isReverseGeocoding={isReverseGeocoding}
      isMoving={isMoving}
      searchQuery={searchQuery}
      searchResults={searchResults}
      selectedLocation={selectedLocation}
      snapResult={snapResult}
      canConfirm={canConfirm}
      routeTitle={routeTitle}
      distanceText={distanceText}
      stopsCount={stopsCount}
      history={history}
      initialCenter={initialCenter}
      routeGeoJSON={routeGeoJSON}
      connectorGeoJSON={connectorGeoJSON}
      routeBounds={routeBounds}
      routeCoordinates={routeCoordinates}
      mapRef={mapRef}
      cameraRef={cameraRef}
      startLocation={startLocation}
      destinationLocation={destinationLocation}
      onBackPress={handleBackPress}
      onSearchPress={handleSearchPress}
      onChangeSearch={handleChangeSearch}
      onSelectLocation={handleSelectLocation}
      onSelectHistory={handleSelectHistory}
      onConfirm={handleConfirm}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onRegionWillChange={handleRegionWillChange}
      onRegionIsChanging={handleRegionIsChanging}
      onRegionChangeComplete={handleRegionChangeComplete}
      onMapPress={handleMapPress}
      isMapMounted={isMapMounted}
    />
  );
};
