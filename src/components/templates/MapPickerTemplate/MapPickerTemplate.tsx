import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
  GradientOverlay
} from './MapPickerTemplate.styles';
import { MapSearchOverlayProps, MapSearchOverlay } from '@/components/organisms/MapSearchOverlay';
import { LocationDetailsCardProps } from '@/components/molecules/LocationDetailsCard';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { moderateScale } from '@/styles';

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
}) => {
  const theme = useTheme();
  const { mapPicker } = useLocale();
  const bounceAnim = useRef(new Animated.Value(0)).current;

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

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    if (!isInitiallyCentered) {
      setIsInitiallyCentered(true);
    }
  }, [bounceAnim, isInitiallyCentered, setIsInitiallyCentered]);

  return (
    <ScreenShell title='Select Location' onBack={true}>

      {isMapVisible ? (
        <>
          <StyledMapView
            ref={mapRef}
            mapStyle={'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json'}
            onRegionDidChange={onRegionChangeComplete}
          >
            <Camera
              ref={cameraRef}
              center={[region.longitude, region.latitude]}
              zoom={14}
            />
            <UserLocation />
          </StyledMapView>

          <GradientOverlay colors={['transparent', 'rgba(0,0,0,0.05)']} />

          <PinContainer pointerEvents="none">
            <TooltipBubble>
              <TooltipText>
                {pickerType === 'start' ? mapPicker.setPickup : mapPicker.setDestination}
              </TooltipText>
            </TooltipBubble>

            <PinShadow />
            <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>

              <MaterialIcons name="location-on" size={moderateScale(28)} color={theme.colors.on_primary} />

            </Animated.View>
          </PinContainer>

          <SelectButtonContainer>
            <SelectButton
              onPress={locationDetailsProps.onSelect}
              disabled={locationDetailsProps.disabled || !locationDetailsProps.locationName}
              activeOpacity={0.9}
            >
              <SelectGradient
                colors={['transparent', 'transparent']}
                style={{ opacity: (locationDetailsProps.disabled || !locationDetailsProps.locationName) ? 0.6 : 1 }}
              >
                <SelectButtonText>{mapPicker.selectLocation}</SelectButtonText>
              </SelectGradient>
            </SelectButton>
          </SelectButtonContainer>

          <MapControlsFABs />
        </>
      ) : <MapSearchOverlay {...searchOverlayProps} />}
    </ScreenShell>
  );
};