import React, { memo } from 'react';
import { SelectLocationTemplate } from '@/components/templates/SelectLocationTemplate';
import { MapPin } from '@/components/atoms/MapPin';
import { MapActionFAB } from '@/components/organisms/MapActionFAB';
import { OlaMap, Camera, UserLocation } from '@/components/organisms/OlaMap';
import { useTranslation } from '@/hooks/useTranslation';
import { useSelectLocation } from './useSelectLocation';
import { SelectLocationScreenProps } from './types.d';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';

interface ExtendedUserLocationProps
  extends React.ComponentProps<typeof UserLocation> {
  onUpdate?: (location: any) => void;
  showsUserHeadingIndicator?: boolean;
}

const MapLibreUserLocation =
  UserLocation as React.ComponentType<ExtendedUserLocationProps>;

export const SelectLocationScreen: React.FC<SelectLocationScreenProps> = memo(
  ({ navigation }) => {
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
      isGpsModalVisible,
      setIsGpsModalVisible,
      handleOpenGpsSettings,
      isGpsBannerVisible,
      handleCloseGpsModal,
      handleCloseGpsBanner,
      isLocating,
    } = useSelectLocation();

    return (
      <>
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
                duration={1000}
                easing="fly"
              />
              <MapLibreUserLocation
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
          locationName={
            isLocating
              ? t('chatLocation.loadingCurrentLocation')
              : isReverseGeocoding
              ? t('mapPicker.locating')
              : selectedLocation?.name
          }
          locationAddress={
            isLocating
              ? t('mapPicker.pleaseWait')
              : isReverseGeocoding
              ? t('mapPicker.pleaseWait')
              : selectedLocation?.address
          }
          centerPin={<MapPin />}
          onSendLocation={() => handleConfirmLocation()}
          sendLocationLabel={t('chatLocation.headerTitle')}
          isGpsBannerVisible={isGpsBannerVisible}
          onCloseGpsBanner={handleCloseGpsBanner}
          onOpenGpsSettings={handleOpenGpsSettings}
          isLocating={isLocating}
        />
        <ConfirmationModal
          isVisible={isGpsModalVisible}
          onClose={handleCloseGpsModal}
          onConfirm={handleOpenGpsSettings}
          title={t('chatLocation.gpsModalTitle')}
          message={t('chatLocation.gpsModalMessage')}
          confirmLabel={t('chatLocation.enableGps')}
          cancelLabel={t('common.cancel')}
          type="warning"
        />
      </>
    );
  },
);
