import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { ActiveRideBannerProps } from './types';
import * as S from './ActiveRideBanner.styles';

export const ActiveRideBanner: React.FC<ActiveRideBannerProps> = React.memo(
  ({ title, subtitle, etaMinutes, distanceKm, onPress, onDismiss }) => {
    const theme = useTheme();
    const { activeRideBanner: t } = useLocale();

    const displayTitle = title || t.aboutToStartTitle;
    const displaySubtitle =
      subtitle ||
      (etaMinutes
        ? `${etaMinutes} mins away • ${distanceKm ? `${Number(distanceKm).toFixed(1)} km` : ''}`
        : t.subtitle);

    return (
      <S.BannerContainer activeOpacity={0.9} onPress={onPress}>
        <S.TopRow>
          <S.StatusBadgeRow>
            <S.PulsingDot />
            <S.StatusBadgeText>{t.inProgressTitle}</S.StatusBadgeText>
          </S.StatusBadgeRow>

          {onDismiss && (
            <S.DismissButton
              onPress={onDismiss}
              accessibilityLabel="Dismiss ride alert"
            >
              <Icon
                name="close"
                size={moderateScale(14)}
                color={theme.colors.on_primary}
              />
            </S.DismissButton>
          )}
        </S.TopRow>

        <S.MainContentRow>
          <S.TextSection>
            <S.TitleText numberOfLines={1}>{displayTitle}</S.TitleText>
            <S.SubtitleText numberOfLines={1}>{displaySubtitle}</S.SubtitleText>
          </S.TextSection>

          <S.ActionPill>
            <S.ActionPillText>{t.trackButton}</S.ActionPillText>
            <Icon
              name="arrow-forward"
              size={moderateScale(14)}
              color={theme.colors.on_primary}
            />
          </S.ActionPill>
        </S.MainContentRow>
      </S.BannerContainer>
    );
  },
);

ActiveRideBanner.displayName = 'ActiveRideBanner';
