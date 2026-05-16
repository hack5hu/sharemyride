import React, { memo } from 'react';
import { Camera, UserLocation } from '@maplibre/maplibre-react-native';
import { SelectLocationTemplate } from '@/components/templates/SelectLocationTemplate';
import { MapPin } from '@/components/atoms/MapPin';
import { MapActionFAB } from '@/components/organisms/MapActionFAB';
import { OlaMap } from '@/components/organisms/OlaMap';
import { useTranslation } from '@/hooks/useTranslation';
import { useSelectLocation } from './useSelectLocation';
import { SelectLocationScreenProps } from './types.d';

export const SelectLocationScreen: React.FC<SelectLocationScreenProps> = memo(({ navigation }) => {
  const { t } = useTranslation();
  const {
    region,
    selectedLocation,
    isReverseGeocoding,
    handleRegionChangeComplete,
    handleConfirmLocation,
    handleUserLocationUpdate,
    handleMyLocationPress,
    handleZoomIn,
    handleZoomOut,
    zoom,
    mapRef,
    cameraRef,
  } = useSelectLocation();

  return (
    <SelectLocationTemplate
      mapBackground={
        <OlaMap
          ref={mapRef}
          onRegionDidChange={handleRegionChangeComplete}
          style={{ flex: 1, width: '100%', height: '100%' }}
        >
          <Camera
            ref={cameraRef}
            center={[region.longitude, region.latitude]}
            zoom={zoom}
            animationMode="flyTo"
            animationDuration={1000}
          />
          <UserLocation 
            showsUserHeadingIndicator={true}
            onUpdate={handleUserLocationUpdate} 
          />
        </OlaMap>
      }
      title={t('chatLocation.headerTitle')}
      onBack={() => navigation.goBack()}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onMyLocationPress={handleMyLocationPress}
      locationName={isReverseGeocoding ? t('mapPicker.locating') : selectedLocation?.name}
      locationAddress={isReverseGeocoding ? t('mapPicker.pleaseWait') : selectedLocation?.address}
      centerPin={<MapPin />}
      onSendLocation={() => handleConfirmLocation()}
      sendLocationLabel={t('chatLocation.headerTitle')}
    />
  );
});
