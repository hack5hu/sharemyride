import React from 'react';
import { StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { moderateScale } from '@/styles';
import {
  FullScreenContainer,
  MapWrapper,
  FloatingHeader,
  HeaderRow,
  BackButton,
  HeaderTitle,
  CenterPinWrapper,
  BottomContainer,
  ActionFABWrapper,
  ZoomControlsWrapper,
  LocationPreviewContainer,
  LocationPreviewTitle,
  LocationPreviewText,
  SelectButtonContainer,
  SelectButton,
  SelectGradient,
  SelectButtonText,
} from './SelectLocationTemplate.styles';
import { SelectLocationTemplateProps } from './types.d';

export interface SelectLocationTemplateExtendedProps extends SelectLocationTemplateProps {
  title?: string;
  onBack?: () => void;
  onMyLocationPress?: () => void;
}

export const SelectLocationTemplate: React.FC<SelectLocationTemplateExtendedProps> = ({
  mapBackground,
  title,
  onBack,
  actionFAB,
  centerPin,
  onZoomIn,
  onZoomOut,
  onMyLocationPress,
  locationName,
  locationAddress,
  onSendLocation,
  sendLocationLabel,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <FullScreenContainer>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Layer 0 — Full-bleed map */}
      <MapWrapper>{mapBackground}</MapWrapper>

      {/* Layer 1 — Floating glass header with back button */}
      <FloatingHeader topInset={insets.top}>
        <HeaderRow>
          {onBack && (
            <BackButton onPress={onBack} activeOpacity={0.8}>
              <Icon
                name="arrow-back"
                size={moderateScale(20)}
                color={theme.colors.on_surface}
              />
            </BackButton>
          )}
          {title && <HeaderTitle>{title}</HeaderTitle>}
        </HeaderRow>
      </FloatingHeader>

      {/* Layer 2 — Center pin (pointer-events none so map stays interactive) */}
      <CenterPinWrapper pointerEvents="none">
        {centerPin}
      </CenterPinWrapper>

      {/* Layer 2.5 — Zoom Controls */}
      {(onZoomIn || onZoomOut) && (
        <ZoomControlsWrapper>
          <MapControlsFABs onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
        </ZoomControlsWrapper>
      )}

      {/* Layer 3 — Stacked bottom elements */}
      <BottomContainer pointerEvents="box-none">
        {/* Locate Me FAB (optional) */}
        {onMyLocationPress && (
          <ActionFABWrapper style={{ alignItems: 'flex-end', paddingBottom: 0 }}>
            <BackButton 
              onPress={onMyLocationPress} 
              activeOpacity={0.8} 
              style={{ 
                backgroundColor: theme.colors.surface,
                shadowColor: theme.colors.on_surface,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 6
              }}
            >
              <Icon
                name="my-location"
                size={moderateScale(20)}
                color={theme.colors.primary}
              />
            </BackButton>
          </ActionFABWrapper>
        )}

        <SelectButtonContainer>
          {(locationName || locationAddress) && (
            <LocationPreviewContainer>
              <Icon
                name="place"
                size={moderateScale(24)}
                color={theme.colors.primary}
                style={{ marginRight: moderateScale(12) }}
              />
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <LocationPreviewTitle numberOfLines={1}>
                  {locationName || 'Loading location...'}
                </LocationPreviewTitle>
                {!!locationAddress && (
                  <LocationPreviewText numberOfLines={1} style={{ marginTop: 2 }}>
                    {locationAddress}
                  </LocationPreviewText>
                )}
              </View>
            </LocationPreviewContainer>
          )}
          
          <SelectButton
            onPress={onSendLocation}
            disabled={!locationName}
            activeOpacity={0.9}
          >
            <SelectGradient style={{ opacity: !locationName ? 0.6 : 1 }}>
              <SelectButtonText>{sendLocationLabel || 'Send Location'}</SelectButtonText>
            </SelectGradient>
          </SelectButton>
        </SelectButtonContainer>
      </BottomContainer>
    </FullScreenContainer>
  );
};
