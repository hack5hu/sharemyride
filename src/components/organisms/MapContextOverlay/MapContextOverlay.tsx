import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import {
  Container,
  MapBackground,
  SearchBarWrapper,
  SearchBarMock,
  SearchText,
  IconButton,
  BottomGradient,
  TooltipCard,
  TooltipVisual,
  Dot,
  Line,
  TooltipContent,
  TooltipLabel,
  TooltipValue,
  ContinueGradient,
  ContinueButton,
  ContinueButtonText,
  MapControls,
  MapControlButton,
  MapCenterOverlay,
  MapCenterTooltipBox,
  MapCenterLabel,
  MapCenterTriangle,
} from './MapContextOverlay.styles';

const MAP_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDPfsboIAIoE_mlqCHbUp2PLDLVybJ3E56Zlra61KNlhOyljABXcMLtl0jvugePlNlslasCjJNvPeYScW7Addc-5dyVyCGgjFtlWyBU45K0ZM1_8tRNAsmRd4trlML7wzMfF3k2SepEuRw7d59L2X6f9WfucB-fkkb-HE0LfRqIZAZtKXPrDnnyP4oPTn4MT4irfAu0NE1IH7eijlsnI79wsOLtivnVs1rPIIrORn47-Ujv6lMKIq-Z1eXkAJ0p6HyeeM0v3eCfVJt';

export interface MapContextOverlayProps {
  onSearchPress: () => void;
  onContinue: () => void;
  selectedLocationName?: string;
  routeTitle: string;
}

export const MapContextOverlay: React.FC<MapContextOverlayProps> = ({
  onSearchPress,
  onContinue,
  selectedLocationName,
  routeTitle,
}) => {
  const theme = useTheme();
  const { middleStopMap: t } = useLocale();

  return (
    <Container>
      <MapBackground source={{ uri: MAP_IMAGE_URL }} resizeMode="cover" />

      {/* Floating Center Map Tooltip */}
      {selectedLocationName && (
        <MapCenterOverlay>
          <MapCenterTooltipBox>
            <MaterialIcons name="add-location" size={moderateScale(14)} color={theme.colors.primary} />
            <MapCenterLabel>Add Stop: {selectedLocationName}</MapCenterLabel>
          </MapCenterTooltipBox>
          <MapCenterTriangle />
        </MapCenterOverlay>
      )}

      {/* Top Search Bar (Mock) */}
      <SearchBarWrapper>
        <SearchBarMock onPress={onSearchPress} activeOpacity={0.8}>
          <MaterialIcons name="search" size={moderateScale(24)} color={theme.colors.primary} />
          <SearchText>{t.searchPlaceholder}</SearchText>
          <IconButton>
            <MaterialIcons name="tune" size={moderateScale(20)} color={theme.colors.on_surface_variant} />
          </IconButton>
        </SearchBarMock>
      </SearchBarWrapper>

      {/* Side Map Controls */}
      <MapControls>
        <MapControlButton activeOpacity={0.7}>
          <MaterialIcons name="my-location" size={moderateScale(24)} color={theme.colors.on_surface} />
        </MapControlButton>
        <MapControlButton activeOpacity={0.7}>
          <MaterialIcons name="layers" size={moderateScale(24)} color={theme.colors.on_surface} />
        </MapControlButton>
      </MapControls>

      {/* Bottom Tooltip & Action */}
      <BottomGradient
        colors={['transparent', `${theme.colors.surface}E6`, theme.colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <TooltipCard>
          <TooltipVisual>
            <Dot />
            <Line />
            <MaterialIcons name="location-on" size={moderateScale(18)} color={theme.colors.primary} />
          </TooltipVisual>
          
          <TooltipContent>
            <TooltipLabel>{t.currentRoute}</TooltipLabel>
            <TooltipValue>{routeTitle}</TooltipValue>

            <TooltipLabel isPrimary>{t.selectedStop}</TooltipLabel>
            <TooltipValue isBold>
              {selectedLocationName || 'Select a location on the map'}
            </TooltipValue>
          </TooltipContent>
        </TooltipCard>

        <ContinueButton onPress={onContinue} activeOpacity={0.9} disabled={!selectedLocationName}>
          <ContinueGradient 
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ opacity: selectedLocationName ? 1 : 0.5 }}
          >
            <ContinueButtonText>{t.continue}</ContinueButtonText>
            <MaterialIcons name="arrow-forward" size={moderateScale(18)} color={theme.colors.on_primary} />
          </ContinueGradient>
        </ContinueButton>
      </BottomGradient>
    </Container>
  );
};
