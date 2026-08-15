import React from 'react';
import { StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomSafeArea } from '@/hooks/useBottomSafeArea';
import { useLocale } from '@/constants/localization';
import { Loader } from '@/components/atoms/Loader';
import { Button } from '@/components/atoms/Button';
import { moderateScale } from '@/styles';
import * as S from './SelectLocationTemplate.styles';
import { SelectLocationTemplateProps } from './types.d';

export interface SelectLocationTemplateExtendedProps
  extends SelectLocationTemplateProps {
  title?: string;
  onBack?: () => void;
  onMyLocationPress?: () => void;
  isGpsBannerVisible?: boolean;
  onOpenGpsSettings?: () => void;
  isLocating?: boolean;
}

export const SelectLocationTemplate: React.FC<
  SelectLocationTemplateExtendedProps
> = React.memo(
  ({
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
    onOpenGpsSettings,
    isLocating,
  }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const { chatLocation } = useLocale();

    const bottomInsetVal = useBottomSafeArea(16, 16);

    return (
      <S.FullScreenContainer>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        {/* Layer 0 — Full-bleed map */}
        <S.MapWrapper>{mapBackground}</S.MapWrapper>

        {/* Layer 1 — Floating glass header with back button */}
        <S.FloatingHeader topInset={insets.top}>
          <S.HeaderRow>
            {onBack && (
              <S.BackButton onPress={onBack} activeOpacity={0.8}>
                <Icon
                  name="arrow-back"
                  size={moderateScale(20)}
                  color={theme.colors.on_surface}
                />
              </S.BackButton>
            )}
            {title && <S.HeaderTitle>{title}</S.HeaderTitle>}
          </S.HeaderRow>

          {isGpsBannerVisible && (
            <S.GpsWarningBanner>
              {isLocating ? (
                <>
                  <S.LocatingIndicatorWrapper>
                    <Loader
                      inline
                      size="small"
                      color={theme.colors.on_error_container}
                    />
                  </S.LocatingIndicatorWrapper>
                  <S.GpsWarningText $flex={true}>
                    {chatLocation.loadingCurrentLocation}
                  </S.GpsWarningText>
                </>
              ) : (
                <>
                  <S.GpsWarningContainer>
                    <S.GpsWarningText>
                      {chatLocation.gpsBannerMessage}
                    </S.GpsWarningText>
                    <S.GpsWarningPath>
                      {Platform.OS === 'android'
                        ? chatLocation.gpsSettingsPathAndroid
                        : chatLocation.gpsSettingsPathIos}
                    </S.GpsWarningPath>
                  </S.GpsWarningContainer>
                  <S.GpsEnableButton
                    onPress={onOpenGpsSettings}
                    activeOpacity={0.8}
                  >
                    <S.GpsEnableText>{chatLocation.enableGps}</S.GpsEnableText>
                  </S.GpsEnableButton>
                </>
              )}
            </S.GpsWarningBanner>
          )}
        </S.FloatingHeader>

        {/* Layer 2 — Center pin (pointer-events none so map stays interactive) */}
        <S.CenterPinWrapper pointerEvents="none">
          {centerPin}
        </S.CenterPinWrapper>

        <S.MapControlsFABs
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onLocateMe={onMyLocationPress}
        />

        {/* Layer 3 — Stacked bottom elements */}
        <S.BottomContainer pointerEvents="box-none" bottomInset={bottomInsetVal}>
          <S.SelectButtonContainer>
            {(locationName || locationAddress) && (
              <S.LocationPreviewContainer>
                <S.PreviewIconWrapper>
                  <Icon
                    name="place"
                    size={moderateScale(24)}
                    color={theme.colors.primary}
                  />
                </S.PreviewIconWrapper>
                <S.PreviewTextWrapper>
                  <S.LocationPreviewTitle numberOfLines={1}>
                    {locationName || 'Loading location...'}
                  </S.LocationPreviewTitle>
                  {!!locationAddress && (
                    <S.LocationPreviewText numberOfLines={1}>
                      {locationAddress}
                    </S.LocationPreviewText>
                  )}
                </S.PreviewTextWrapper>
              </S.LocationPreviewContainer>
            )}

            <Button
              variant="primary"
              onPress={onSendLocation}
              disabled={!locationName}
            >
              {sendLocationLabel || 'Send Location'}
            </Button>
          </S.SelectButtonContainer>
        </S.BottomContainer>
      </S.FullScreenContainer>
    );
  },
);

SelectLocationTemplate.displayName = 'SelectLocationTemplate';
