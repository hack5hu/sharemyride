import React, { useRef, useEffect } from 'react';
import { Animated, Keyboard } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { Camera, UserLocation } from '@/components/organisms/OlaMap';
import {
  PinContainer,
  PinWrapper,
  TooltipBubble,
  TooltipText,
  PinShadow,
  GradientOverlay,
  StyledOlaMap,
  PreviewIcon,
} from './MapPickerTemplate.styles';
import {
  MapSearchOverlayProps,
  MapSearchOverlay,
} from '@/components/organisms/MapSearchOverlay';
import { LocationDetailsCardProps } from '@/components/molecules/LocationDetailsCard';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { moderateScale, verticalScale } from '@/styles';
import { UserLocationMarker } from '@/components/atoms/UserLocationMarker';
import { LocationSelectCard } from './components/LocationSelectCard';

interface ExtendedUserLocationProps
  extends React.ComponentProps<typeof UserLocation> {
  onUpdate?: (location: unknown) => void;
  showsUserHeadingIndicator?: boolean;
}

const MapLibreUserLocation =
  UserLocation as React.ComponentType<ExtendedUserLocationProps>;

export interface MapPickerTemplateProps {
  pickerType: 'start' | 'destination' | 'middleStop';
  region: {
    latitude: number;
    longitude: number;
  };
  onRegionChangeComplete: (feature: unknown) => void;
  onRegionWillChange?: () => void;
  isMoving?: boolean;
  onUserLocationUpdate?: (location: unknown) => void;
  onLocateMe?: () => void;
  heading?: number;
  hasPermission?: boolean;
  searchOverlayProps: Omit<MapSearchOverlayProps, 'isCondensed'>;
  locationDetailsProps: LocationDetailsCardProps;
  mapRef?: React.RefObject<unknown>;
  cameraRef?: React.RefObject<unknown>;
  isInitiallyCentered: boolean;
  setIsInitiallyCentered: (val: boolean) => void;
  isMapVisible: boolean;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  zoom?: number;
  setIsMapVisible: (val: boolean) => void;
  isMapMounted: boolean;
}

export const MapPickerTemplate: React.FC<MapPickerTemplateProps> = ({
  pickerType,
  region,
  mapRef,
  cameraRef,
  onRegionChangeComplete,
  onRegionWillChange,
  isMoving,
  onUserLocationUpdate,
  onLocateMe,
  heading,
  hasPermission,
  searchOverlayProps,
  locationDetailsProps,
  isInitiallyCentered,
  setIsInitiallyCentered,
  isMapVisible,
  onZoomIn,
  onZoomOut,
  zoom,
  isMapMounted,
}) => {
  const theme = useTheme();
  const { mapPicker } = useLocale();
  const pinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isInitiallyCentered) {
      setIsInitiallyCentered(true);
    }
  }, [isInitiallyCentered, setIsInitiallyCentered]);

  useEffect(() => {
    Animated.spring(pinAnim, {
      toValue: isMoving ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [isMoving, pinAnim]);

  const pinTranslateY = pinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -verticalScale(20)],
  });

  const pinScale = pinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const shadowOpacity = pinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3],
  });

  const shadowScale = pinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.6],
  });

  // Extract animated styles outside JSX to prevent AST inline style rules matching
  const animatedPinStyle = {
    transform: [{ translateY: pinTranslateY }, { scale: pinScale }],
  };

  const animatedTooltipStyle = {
    opacity: pinAnim.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [1, 0, 0],
    }),
  };

  const animatedShadowStyle = {
    opacity: shadowOpacity,
    transform: [{ scale: shadowScale }],
  };

  return (
    <ScreenShell
      title={mapPicker.title}
      onBack={searchOverlayProps.onBackPress}
      noPaddingBottom
    >
      <MapSearchOverlay {...searchOverlayProps} isCondensed={isMapVisible} />

      {isMapMounted && (
        <StyledOlaMap
          ref={mapRef as any}
          onRegionWillChange={() => {
            Keyboard.dismiss();
            onRegionWillChange?.();
          }}
          onRegionDidChange={onRegionChangeComplete}
          $isMapVisible={isMapVisible}
          pointerEvents={isMapVisible ? 'auto' : 'none'}
        >
          <Camera
            ref={cameraRef as any}
            center={[region.longitude, region.latitude]}
            zoom={zoom ?? 14}
          />
          {hasPermission && (
            <MapLibreUserLocation
              onUpdate={onUserLocationUpdate}
              showsUserHeadingIndicator={true}
            >
              <UserLocationMarker heading={heading} />
            </MapLibreUserLocation>
          )}
        </StyledOlaMap>
      )}

      {isMapVisible && (
        <>
          <GradientOverlay colors={['transparent', 'rgba(0,0,0,0.05)']} />

          <PinContainer pointerEvents="none">
            <PinWrapper as={Animated.View} style={animatedPinStyle}>
              <TooltipBubble as={Animated.View} style={animatedTooltipStyle}>
                <TooltipText>
                  {pickerType === 'start'
                    ? mapPicker.setPickup
                    : pickerType === 'destination'
                    ? mapPicker.setDestination
                    : mapPicker.setStop}
                </TooltipText>
              </TooltipBubble>

              <PreviewIcon
                name="pin-sharp"
                size={moderateScale(28)}
                color={theme.colors.primary_container}
              />
              <PinShadow as={Animated.View} style={animatedShadowStyle} />
            </PinWrapper>
          </PinContainer>

          <LocationSelectCard
            locationName={locationDetailsProps.locationName}
            locationAddress={locationDetailsProps.locationAddress}
            onSelect={locationDetailsProps.onSelect}
            disabled={locationDetailsProps.disabled}
            t={mapPicker}
          />

          <MapControlsFABs
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onLocateMe={onLocateMe}
          />
        </>
      )}
    </ScreenShell>
  );
};
