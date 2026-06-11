import React from 'react';
import { StatusBar, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { useLocale } from '@/constants/localization';
import { Loader } from '@/components/atoms/Loader';
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
  GpsWarningBanner,
  GpsWarningText,
  GpsWarningPath,
  GpsEnableButton,
  GpsEnableText,
  GpsCloseButton,
} from './SelectLocationTemplate.styles';
import { SelectLocationTemplateProps } from './types.d';

export interface SelectLocationTemplateExtendedProps extends SelectLocationTemplateProps {
  title?: string;
  onBack?: () => void;
  onMyLocationPress?: () => void;
  isGpsBannerVisible?: boolean;
  onCloseGpsBanner?: () => void;
  onOpenGpsSettings?: () => void;
  isLocating?: boolean;
}

export const SelectLocationTemplate: React.FC<SelectLocationTemplateExtendedProps> = ({
  mapBackground,
  title,
  onBack,
  centerPin,
  onZoomIn,
  onZoomOut,
  onMyLocationPress,
  locationName,
  locationAddress,
  onSendLocation,
  sendLocationLabel,
  isGpsBannerVisible,
  onCloseGpsBanner,
  onOpenGpsSettings,
  isLocating,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { chatLocation } = useLocale();

  return (
    <FullScreenContainer>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

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

        {isGpsBannerVisible && (
          <GpsWarningBanner>
            {isLocating ? (
              <>
                <Loader
                  inline
                  size="small"
                  color={theme.colors.on_error_container}
                  style={{ marginRight: moderateScale(10) }}
                />
                <GpsWarningText style={{ flex: 1 }}>
                  {chatLocation.loadingCurrentLocation}
                </GpsWarningText>
              </>
            ) : (
              <>
                <View style={{ flex: 1 }}>
                  <GpsWarningText>{chatLocation.gpsBannerMessage}</GpsWarningText>
                  <GpsWarningPath>
                    {Platform.OS === 'android'
                      ? chatLocation.gpsSettingsPathAndroid
                      : chatLocation.gpsSettingsPathIos}
                  </GpsWarningPath>
                </View>
                <GpsEnableButton onPress={onOpenGpsSettings} activeOpacity={0.8}>
                  <GpsEnableText>{chatLocation.enableGps}</GpsEnableText>
                </GpsEnableButton>
                <GpsCloseButton onPress={onCloseGpsBanner} activeOpacity={0.7}>
                  <Icon
                    name="close"
                    size={moderateScale(16)}
                    color={theme.colors.on_error_container}
                  />
                </GpsCloseButton>
              </>
            )}
          </GpsWarningBanner>
        )}
      </FloatingHeader>

      {/* Layer 2 — Center pin (pointer-events none so map stays interactive) */}
      <CenterPinWrapper pointerEvents="none">{centerPin}</CenterPinWrapper>

      <ZoomControlsWrapper>
        <MapControlsFABs
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onLocateMe={onMyLocationPress}
        />
      </ZoomControlsWrapper>

      {/* Layer 3 — Stacked bottom elements */}
      <BottomContainer pointerEvents="box-none">
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
                  <LocationPreviewText
                    numberOfLines={1}
                    style={{ marginTop: 2 }}
                  >
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
              <SelectButtonText>
                {sendLocationLabel || 'Send Location'}
              </SelectButtonText>
            </SelectGradient>
          </SelectButton>
        </SelectButtonContainer>
      </BottomContainer>
    </FullScreenContainer>
  );
};
