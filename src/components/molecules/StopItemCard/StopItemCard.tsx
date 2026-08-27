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
    isNested,
  }) => {
    const theme = useTheme();
    const { activeRideDriver: t } = useLocale();

    const distanceDisplay =
      stop.distanceKm !== undefined
        ? stop.distanceKm < 0.05
          ? t.atStop
          : stop.distanceKm < 1
            ? `${Math.round(stop.distanceKm * 1000)} m`
            : `${stop.distanceKm.toFixed(1)} km`
        : stop.distanceAway?.split('•')[0]?.trim() || '3.8 km';

    const etaDisplay =
      stop.etaMinutes !== undefined
        ? `${stop.etaMinutes} ${stop.etaMinutes === 1 ? 'min' : 'mins'}`
        : stop.distanceAway?.split('•')[1]?.trim() || '5 mins';

    const seatCount = stop.seatCount || 1;
    const seatText =
      seatCount > 1
        ? t.seatsCountPlural.replace('{{count}}', String(seatCount))
        : t.seatsCount.replace('{{count}}', String(seatCount));

    return (
      <S.StopCard $isNested={isNested}>
        <S.CardTopRow>
          <S.AvatarWrapper>
            <Avatar
              source={
                stop.passengerAvatar ? { uri: stop.passengerAvatar } : undefined
              }
              placeholder={stop.passengerName}
              size="sm"
            />
          </S.AvatarWrapper>

          <S.PassengerInfo>
            <S.NameRow>
              <S.PassengerNameText numberOfLines={1}>
                {stop.passengerName}
              </S.PassengerNameText>
              <S.SeatTag>
                <S.SeatTagText>{seatText}</S.SeatTagText>
              </S.SeatTag>
            </S.NameRow>

            <S.MetricsInlineRow>
              <S.MetricItem>
                <Icon
                  name="navigation"
                  size={moderateScale(12)}
                  color={theme.colors.primary}
                />
                <S.MetricHighlight>{distanceDisplay}</S.MetricHighlight>
              </S.MetricItem>

              <S.MetricItem>
                <Icon
                  name="schedule"
                  size={moderateScale(12)}
                  color={theme.colors.primary}
                />
                <S.MetricItemText>{etaDisplay}</S.MetricItemText>
              </S.MetricItem>
            </S.MetricsInlineRow>
          </S.PassengerInfo>

          <S.ActionButtonsRow>
            <S.ChatIconButton
              onPress={() => onChatPress(stop)}
              accessibilityLabel={chatAccessibilityLabel}
              activeOpacity={0.75}
            >
              <Icon
                name="chat"
                size={moderateScale(16)}
                color={theme.colors.primary}
              />
            </S.ChatIconButton>

            <S.CallIconButton
              onPress={() => onCallPress(stop)}
              accessibilityLabel={callAccessibilityLabel}
              activeOpacity={0.8}
            >
              <Icon
                name="call"
                size={moderateScale(16)}
                color={theme.colors.on_primary || '#ffffff'}
              />
            </S.CallIconButton>
          </S.ActionButtonsRow>
        </S.CardTopRow>
      </S.StopCard>
    );
  },
);

StopItemCard.displayName = 'StopItemCard';
