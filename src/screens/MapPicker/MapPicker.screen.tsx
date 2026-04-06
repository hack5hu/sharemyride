import React from 'react';
import { MapPickerTemplate } from '@/components/templates/MapPickerTemplate';
import { useMapPicker } from './useMapPicker';

export const MapPickerScreen: React.FC = () => {
  const {
    pickerType,
    mapImageSource,
    mockLocations,
    selectedLocation,
    handleBackPress,
    handleSearchSelect,
    handleConfirmLocation,
  } = useMapPicker();

  return (
    <MapPickerTemplate
      pickerType={pickerType}
      mapImageSource={mapImageSource}
      searchOverlayProps={{
        onBackPress: handleBackPress,
        onSelectLocation: handleSearchSelect,
        mockLocations,
      }}
      locationDetailsProps={{
        locationName: selectedLocation?.name,
        locationAddress: selectedLocation?.address,
        onSelect: handleConfirmLocation,
        disabled: !selectedLocation,
      }}
    />
  );
};
