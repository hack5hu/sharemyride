import React from 'react';
import { MapPickerTemplate } from '@/components/templates/MapPickerTemplate';
import { useMapPicker } from './useMapPicker';

export const MapPickerScreen: React.FC = () => {
  const {
    pickerType,
    region,
    searchQuery,
    setSearchQuery,
    searchResults,
    history,
    selectedLocation,
    handleBackPress,
    handleSearchSelect,
    handleRegionChangeComplete,
    handleConfirmLocation,
    handleZoomIn,
    handleZoomOut,
    cameraRef,
    mapRef,
    isReverseGeocoding,
    isInitiallyCentered,
    setIsInitiallyCentered,
    isMapVisible,
    currentZoom,
    setIsMapVisible
  } = useMapPicker();

  return (
    <MapPickerTemplate
      pickerType={pickerType}
      region={region}
      onRegionChangeComplete={handleRegionChangeComplete}
      mapRef={mapRef}
      cameraRef={cameraRef}
      isMapVisible={isMapVisible}
      setIsMapVisible={setIsMapVisible}
      zoom={currentZoom}
      isInitiallyCentered={isInitiallyCentered}
      setIsInitiallyCentered={setIsInitiallyCentered}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      searchOverlayProps={{
        onBackPress: handleBackPress,
        onSelectLocation: handleSearchSelect,
        searchQuery,
        onSearchChange: setSearchQuery,
        results: searchResults,
        history,
      }}
      locationDetailsProps={{
        locationName: isReverseGeocoding ? 'Locating...' : selectedLocation?.name,
        locationAddress: isReverseGeocoding ? 'Please wait...' : selectedLocation?.address,
        onSelect: handleConfirmLocation,
        disabled: !selectedLocation || isReverseGeocoding,
      }}
    />
  );
};
