import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocale } from '@/constants/localization';
import { checkLocationServices } from '@/utils/permissionUtils';
import { useLiveRideStore } from '@/store/useLiveRideStore';
import { moderateScale } from '@/styles';
import { GlobalGpsBannerProps } from './types';
import * as S from './GlobalGpsBanner.styles';

export const GlobalGpsBanner: React.FC<GlobalGpsBannerProps> = React.memo(
  ({ testID, onPress }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const { notification: t } = useLocale();
    const isLiveLocationEnabled = useLiveRideStore(
      (state) => state.isLiveLocationEnabled,
    );
    const isGpsDisabled = useLiveRideStore((state) => state.isGpsDisabled);

    const handlePress = useCallback(() => {
      if (onPress) {
        onPress();
      } else {
        checkLocationServices();
      }
    }, [onPress]);

    if (!isLiveLocationEnabled || !isGpsDisabled) {
      return null;
    }

    return (
      <S.BannerContainer
        testID={testID}
        $topInset={insets.top}
        activeOpacity={0.85}
        onPress={handlePress}
      >
        <S.LeftContent>
          <S.IconBadge>
            <Icon
              name="location-off"
              size={moderateScale(18)}
              color={theme.colors.on_error || '#ffffff'}
            />
          </S.IconBadge>
          <S.TextColumn>
            <S.TitleText numberOfLines={1}>{t.gpsDisabledTitle}</S.TitleText>
            <S.SubtitleText numberOfLines={1}>
              {t.gpsDisabledMessage}
            </S.SubtitleText>
          </S.TextColumn>
        </S.LeftContent>

        <S.ActionButton>
          <S.ActionButtonText>{t.gpsBannerButton}</S.ActionButtonText>
          <Icon
            name="settings"
            size={moderateScale(12)}
            color={theme.colors.on_error || '#ffffff'}
          />
        </S.ActionButton>
      </S.BannerContainer>
    );
  },
);

GlobalGpsBanner.displayName = 'GlobalGpsBanner';
