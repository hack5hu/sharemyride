import React, { useState, useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import * as S from './PassengerHeroCard.styles';

export interface PassengerHeroCardProps {
  t: any;
  safeEta: number;
  safeDistance: number;
  nextStopName?: string;
  nextStopLat?: number;
  nextStopLon?: number;
  onCopyLocation?: (address: string) => void;
  onOpenMap?: (lat?: number, lon?: number, address?: string) => void;
}

export const PassengerHeroCard: React.FC<PassengerHeroCardProps> = React.memo(
  ({
    t,
    safeEta,
    safeDistance,
    nextStopName,
    nextStopLat,
    nextStopLon,
    onCopyLocation,
    onOpenMap,
  }) => {
    const theme = useTheme();
    const [copiedNextStop, setCopiedNextStop] = useState(false);

    const handleCopyNextStop = useCallback(() => {
      if (onCopyLocation && nextStopName) {
        onCopyLocation(nextStopName);
        setCopiedNextStop(true);
        setTimeout(() => setCopiedNextStop(false), 2000);
      }
    }, [nextStopName, onCopyLocation]);

    const handleOpenMapNextStop = useCallback(() => {
      if (onOpenMap && nextStopName) {
        onOpenMap(nextStopLat, nextStopLon, nextStopName);
      }
    }, [nextStopLat, nextStopLon, nextStopName, onOpenMap]);

    const formattedDistance = useMemo(() => {
      if (!safeDistance || safeDistance <= 0) return null;
      if (t.distanceLabel && t.distanceLabel.includes('{{km}}')) {
        return t.distanceLabel.replace('{{km}}', safeDistance.toFixed(1));
      }
      return `${safeDistance.toFixed(1)} km`;
    }, [safeDistance, t.distanceLabel]);

    return (
      <S.HeroCard>
        <S.HeroTopRow>
          <S.HeroBadgeContainer>
            <S.HeroLabel>{t.driverArrivingIn}</S.HeroLabel>
          </S.HeroBadgeContainer>
          {!!formattedDistance && (
            <S.DistancePill>
              <Icon name="navigation" size={moderateScale(11)} color={theme.colors.on_primary} />
              <S.DistanceText>{formattedDistance}</S.DistanceText>
            </S.DistancePill>
          )}
        </S.HeroTopRow>

        <S.ETARow>
          <S.ETANumber>{safeEta}</S.ETANumber>
          <S.ETAMinutesText>{safeEta === 1 ? t.min : t.mins}</S.ETAMinutesText>
        </S.ETARow>

        {!!nextStopName && (
          <S.NextStopContainer>
            <S.NextStopRow>
              <Icon name="place" size={moderateScale(16)} color={theme.colors.on_primary} />
              <S.NextStopText numberOfLines={2}>
                {t.arrivingAt.replace('{{stop}}', nextStopName)}
              </S.NextStopText>
            </S.NextStopRow>
            <S.HeroActionsRow>
              <S.HeroActionPill onPress={handleCopyNextStop} activeOpacity={0.75}>
                <Icon
                  name={copiedNextStop ? 'check' : 'content-copy'}
                  size={moderateScale(12)}
                  color={theme.colors.on_primary}
                />
                <S.HeroActionPillText>
                  {copiedNextStop ? t.copiedLocation : t.copyLocation}
                </S.HeroActionPillText>
              </S.HeroActionPill>
              <S.HeroActionPill onPress={handleOpenMapNextStop} activeOpacity={0.75}>
                <Icon name="place" size={moderateScale(12)} color={theme.colors.on_primary} />
                <S.HeroActionPillText>{t.openInMap}</S.HeroActionPillText>
              </S.HeroActionPill>
            </S.HeroActionsRow>
          </S.NextStopContainer>
        )}
      </S.HeroCard>
    );
  },
);

PassengerHeroCard.displayName = 'PassengerHeroCard';
