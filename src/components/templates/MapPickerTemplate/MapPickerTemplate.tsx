import React, { useRef, useEffect } from 'react';
import { Animated, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { TransformRequestManager, Camera, UserLocation } from '@maplibre/maplibre-react-native';
import { getOlaStyleUrl, OLA_API_KEY } from '@/constants/OlaStyle';
import {
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
import { OlaMap } from '@/components/organisms/OlaMap';
import { MapSearchOverlayProps, MapSearchOverlay } from '@/components/organisms/MapSearchOverlay';
import { LocationDetailsCardProps } from '@/components/molecules/LocationDetailsCard';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { moderateScale, scale, verticalScale } from '@/styles';

import { UserLocationMarker } from '@/components/atoms/UserLocationMarker';

export interface MapPickerTemplateProps {
  pickerType: 'start' | 'destination' | 'middleStop';
  region: {
    latitude: number;
    longitude: number;
  };
  onRegionChangeComplete: (feature: any) => void;
  onRegionWillChange?: () => void;
  isMoving?: boolean;
  onUserLocationUpdate?: (location: any) => void;
  onLocateMe?: () => void;
  heading?: number;
  hasPermission?: boolean;
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
  setIsMapVisible,
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

  return (
    <ScreenShell title='Select Location' onBack={true}>
      <MapSearchOverlay 
        {...searchOverlayProps} 
        isCondensed={isMapVisible} 
        setIsCondensed={setIsMapVisible}
      />

      {/* Map Layer - Warm Mounted */}
      <OlaMap
        ref={mapRef}
        onRegionWillChange={onRegionWillChange}
        onRegionDidChange={onRegionChangeComplete}
        style={{ 
          flex: 1,
          width: '100%',
          height: '100%',
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
        {hasPermission && (
          <UserLocation 
            onUpdate={onUserLocationUpdate} 
            showsUserHeadingIndicator={true}
          >
            <UserLocationMarker heading={heading} />
          </UserLocation>
        )}
      </OlaMap>

      {isMapVisible && (
        <>
          <GradientOverlay colors={['transparent', 'rgba(0,0,0,0.05)']} />

          <PinContainer 
            pointerEvents="none" 
            as={Animated.View}
            style={{
              transform: [
                { translateX: -moderateScale(24) },
                { translateY: Animated.add(-moderateScale(48), pinTranslateY) },
                { scale: pinScale }
              ]
            }}
          >
            <TooltipBubble 
              as={Animated.View} 
              style={{ 
                opacity: pinAnim.interpolate({
                  inputRange: [0, 0.2, 1],
                  outputRange: [1, 0, 0]
                }) 
              }}
            >
              <TooltipText>
                {pickerType === 'start' 
                  ? mapPicker.setPickup 
                  : pickerType === 'destination' 
                    ? mapPicker.setDestination 
                    : mapPicker.setStop}
              </TooltipText>
            </TooltipBubble>

            <Ionicons
              name="pin-sharp" 
              size={moderateScale(28)} 
              color={theme.colors.primary_container} 
            />
            <PinShadow 
              as={Animated.View} 
              style={{ 
                opacity: shadowOpacity,
                transform: [{ scale: shadowScale }]
              }} 
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