import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { MapSearchOverlayProps, MapSearchOverlay } from '@/components/organisms/MapSearchOverlay';
import { LocationDetailsCardProps, LocationDetailsCard } from '@/components/molecules/LocationDetailsCard';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import {
  Container,
  MapImageBackground,
  GradientOverlay,
  PinContainer,
  TooltipBubble,
  TooltipText,
  PinCircle,
  PinShadow,
} from './MapPickerTemplate.styles';
import { moderateScale } from '@/styles';

export interface MapPickerTemplateProps {
  pickerType: 'start' | 'destination';
  mapImageSource: any; // using static image for now per requirements
  searchOverlayProps: MapSearchOverlayProps;
  locationDetailsProps: LocationDetailsCardProps;
}

export const MapPickerTemplate: React.FC<MapPickerTemplateProps> = ({
  pickerType,
  mapImageSource,
  searchOverlayProps,
  locationDetailsProps,
}) => {
  const theme = useTheme();
  const { mapPicker } = useLocale();
  
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Simple bobbing animation for the pin mimicking the HTML hover
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
  }, [bounceAnim]);

  return (
    <Container>
      <MapImageBackground source={{ uri: mapImageSource }} resizeMode="cover" />
      <GradientOverlay />

      <MapSearchOverlay {...searchOverlayProps} />

      {/* Center Map Pin */}
      <PinContainer>
        <TooltipBubble>
          <TooltipText>
            {pickerType === 'start' ? mapPicker.setPickup : mapPicker.setDestination}
          </TooltipText>
        </TooltipBubble>
        
        <PinShadow />
        <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
          <PinCircle>
            <MaterialIcons name="location-on" size={moderateScale(28)} color={theme.colors.on_primary} />
          </PinCircle>
        </Animated.View>
      </PinContainer>

      <MapControlsFABs />

      <LocationDetailsCard {...locationDetailsProps} />
    </Container>
  );
};
