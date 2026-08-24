import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { ActiveRideBannerProps } from './types';
import * as S from './ActiveRideBanner.styles';

export const ActiveRideBanner: React.FC<ActiveRideBannerProps> = React.memo(
  ({ title, subtitle, etaMinutes, distanceKm, onPress }) => {
    const theme = useTheme();
    const { activeRideBanner: t } = useLocale();

    const displayTitle = title || t.aboutToStartTitle;
    const displaySubtitle = (() => {
      if (subtitle) return subtitle;
      if (etaMinutes !== undefined && etaMinutes !== null) {
        const distPart =
          distanceKm !== undefined &&
          distanceKm !== null &&
          Number(distanceKm) > 0
            ? ` • ${Number(distanceKm).toFixed(1)} km`
            : '';
        return `${etaMinutes} mins away${distPart}`;
      }
      return t.subtitle;
    })();

    return (
      <S.BannerContainer activeOpacity={0.9} onPress={onPress}>
        <S.TopRow>
          <S.StatusBadgeRow>
            <S.PulsingDot />
            <S.StatusBadgeText>{t.inProgressTitle}</S.StatusBadgeText>
          </S.StatusBadgeRow>
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
