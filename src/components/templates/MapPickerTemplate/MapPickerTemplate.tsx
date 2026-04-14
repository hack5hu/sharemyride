import React, { useRef, useEffect } from 'react';
import { Animated, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { TransformRequestManager, Camera, UserLocation } from '@maplibre/maplibre-react-native';
import { getOlaStyleUrl, OLA_API_KEY } from '@/constants/OlaStyle';
import {
  StyledMapView,
  PinContainer,
  TooltipBubble,
  TooltipText,
  PinShadow,
  SelectButtonContainer,
  SelectButton,
  SelectGradient,
  SelectButtonText,
  GradientOverlay,
  LocationPreviewContainer,
  LocationPreviewTitle,
  LocationPreviewText
} from './MapPickerTemplate.styles';
import { MapSearchOverlayProps, MapSearchOverlay } from '@/components/organisms/MapSearchOverlay';
import { LocationDetailsCardProps } from '@/components/molecules/LocationDetailsCard';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { moderateScale, scale } from '@/styles';

export interface MapPickerTemplateProps {
  pickerType: 'start' | 'destination';
  region: {
    latitude: number;
    longitude: number;
  };
  onRegionChangeComplete: (feature: any) => void;
  searchOverlayProps: MapSearchOverlayProps;
  locationDetailsProps: LocationDetailsCardProps;
  mapRef?: React.RefObject<any>;
  cameraRef?: React.RefObject<any>;
  isInitiallyCentered: boolean;
  setIsInitiallyCentered: (val: boolean) => void;
  isMapVisible: boolean;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  zoom?: number;
  setIsMapVisible: (val: boolean) => void;
}

export const MapPickerTemplate: React.FC<MapPickerTemplateProps> = ({
  pickerType,
  region,
  mapRef,
  cameraRef,
  onRegionChangeComplete,
  searchOverlayProps,
  locationDetailsProps,
  isInitiallyCentered,
  setIsInitiallyCentered,
  isMapVisible,
  onZoomIn,
  onZoomOut,
  zoom,
  setIsMapVisible,
}) => {
  const theme = useTheme();
  const { mapPicker } = useLocale();

  useEffect(() => {
    // Setup global credentials for Ola Maps API v11
    TransformRequestManager.addUrlSearchParam({
      id: "ola-api-key",
      match: /api\.olamaps\.io/,
      name: "api_key",
      value: OLA_API_KEY,
    });

    // Strip out any redundant 'key=' parameters from the style JSON
    TransformRequestManager.addUrlTransform({
      id: "ola-key-cleanup",
      match: "api\\.olamaps\\.io",
      find: "([?&])key=[^&?]+",
      replace: "$1",
    });

    if (!isInitiallyCentered) {
      setIsInitiallyCentered(true);
    }
  }, [isInitiallyCentered, setIsInitiallyCentered]);
  console.log(locationDetailsProps)
  return (
    <ScreenShell title='Select Location' onBack={true}>
      <MapSearchOverlay 
        {...searchOverlayProps} 
        isCondensed={isMapVisible} 
        setIsCondensed={setIsMapVisible}
      />

      {/* Map Layer - Warm Mounted */}
      <StyledMapView
        ref={mapRef}
        mapStyle={'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json'}
        onRegionDidChange={onRegionChangeComplete}
        style={{ 
          opacity: isMapVisible ? 1 : 0,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}
        pointerEvents={isMapVisible ? 'auto' : 'none'}
      >
        <Camera
          ref={cameraRef}
          center={[region.longitude, region.latitude]}
          zoom={zoom ?? 14}
        />
        <UserLocation />
      </StyledMapView>

      {isMapVisible && (
        <>
          <GradientOverlay colors={['transparent', 'rgba(0,0,0,0.05)']} />

          <PinContainer pointerEvents="none">
            <TooltipBubble>
              <TooltipText>
                {pickerType === 'start' ? mapPicker.setPickup : mapPicker.setDestination}
              </TooltipText>
            </TooltipBubble>

            <Ionicons
              name="pin-sharp" 
              size={moderateScale(28)} 
              color={theme.colors.primary_container} 
            />
          </PinContainer>

          <SelectButtonContainer>
            <LocationPreviewContainer>
              <Ionicons
                name="locate-sharp"
                size={moderateScale(18)}
                color={theme.colors.primary}
                style={{ marginRight: scale(8) }}
              />
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <LocationPreviewTitle numberOfLines={1}>
                  {locationDetailsProps.locationName || 'Select a spot on the map'}
                </LocationPreviewTitle>
                {!!locationDetailsProps.locationAddress && (
                  <LocationPreviewText numberOfLines={1}>
                    {locationDetailsProps.locationAddress}
                  </LocationPreviewText>
                )}
              </View>
            </LocationPreviewContainer>

            <SelectButton
              onPress={locationDetailsProps.onSelect}
              disabled={locationDetailsProps.disabled || !locationDetailsProps.locationName}
              activeOpacity={0.9}
            >
              <SelectGradient
                colors={[theme.colors.primary, theme.colors.primary]}
                style={{ opacity: (locationDetailsProps.disabled || !locationDetailsProps.locationName) ? 0.6 : 1 }}
              >
                <SelectButtonText>{mapPicker.selectLocation}</SelectButtonText>
              </SelectGradient>
            </SelectButton>
          </SelectButtonContainer>

          <MapControlsFABs onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
        </>
      )}
    </ScreenShell>
  );
};