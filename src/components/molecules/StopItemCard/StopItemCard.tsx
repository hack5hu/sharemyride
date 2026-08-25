import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Avatar } from '@/components/atoms/Avatar';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { StopItemCardProps } from './types.d';
import * as S from './StopItemCard.styles';

export const StopItemCard: React.FC<StopItemCardProps> = React.memo(
  ({
    stop,
    chatAccessibilityLabel,
    callAccessibilityLabel,
    onChatPress,
    onCallPress,
  }) => {
    const theme = useTheme();
    const { activeRideDriver: t } = useLocale();

    const distanceDisplay =
      stop.distanceKm !== undefined
        ? stop.distanceKm < 0.05
          ? 'At stop'
          : stop.distanceKm < 1
            ? `${Math.round(stop.distanceKm * 1000)} m`
            : `${stop.distanceKm.toFixed(1)} km`
        : stop.distanceAway?.split('•')[0]?.trim() || '3.8 km';

    const etaDisplay =
      stop.etaMinutes !== undefined
        ? `${stop.etaMinutes} ${stop.etaMinutes === 1 ? 'min' : 'mins'}`
        : stop.distanceAway?.split('•')[1]?.trim() || '5 mins';

    const seatText = `${stop.seatCount || 1} ${(stop.seatCount || 1) > 1 ? 'Seats' : 'Seat'}`;

    return (
      <S.StopCard>
        {/* Top Tier: Passenger Identity & Actions */}
        <S.CardTopRow>
          <S.AvatarWrapper>
            <Avatar
              source={
                stop.passengerAvatar ? { uri: stop.passengerAvatar } : undefined
              }
              placeholder={stop.passengerName}
              size="md"
            />
          </S.AvatarWrapper>

          <S.PassengerInfo>
            <S.PassengerNameText numberOfLines={1}>
              {stop.passengerName}
            </S.PassengerNameText>
            <S.SeatTag>
              <S.SeatTagText>{seatText}</S.SeatTagText>
            </S.SeatTag>
          </S.PassengerInfo>

          <S.ActionButtonsRow>
            <S.ActionIconButton
              onPress={() => onChatPress(stop)}
              accessibilityLabel={chatAccessibilityLabel}
            >
              <Icon
                name="chat"
                size={moderateScale(18)}
                color={theme.colors.primary}
              />
            </S.ActionIconButton>

            <S.ActionIconButton
              onPress={() => onCallPress(stop)}
              accessibilityLabel={callAccessibilityLabel}
            >
              <Icon
                name="call"
                size={moderateScale(18)}
                color={theme.colors.primary}
              />
            </S.ActionIconButton>
          </S.ActionButtonsRow>
        </S.CardTopRow>

        {/* Bottom Tier: Full Width Metrics Strip with clear context labels */}
        <S.MetricsStrip>
          <S.MetricPill>
            <Icon
              name="navigation"
              size={moderateScale(16)}
              color={theme.colors.primary}
            />
            <S.MetricTextGroup>
              <S.MetricLabelText>{t.distanceToPickupLabel}</S.MetricLabelText>
              <S.MetricValueText numberOfLines={1}>
                {distanceDisplay}
              </S.MetricValueText>
            </S.MetricTextGroup>
          </S.MetricPill>

          <S.MetricPill>
            <Icon
              name="schedule"
              size={moderateScale(16)}
              color={theme.colors.primary}
            />
            <S.MetricTextGroup>
              <S.MetricLabelText>{t.etaToPickupLabel}</S.MetricLabelText>
              <S.MetricValueText numberOfLines={1}>
                {etaDisplay}
              </S.MetricValueText>
            </S.MetricTextGroup>
          </S.MetricPill>
        </S.MetricsStrip>
      </S.StopCard>
    );
  },
);

StopItemCard.displayName = 'StopItemCard';
