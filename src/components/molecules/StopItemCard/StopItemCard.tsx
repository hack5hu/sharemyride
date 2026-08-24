import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Avatar } from '@/components/atoms/Avatar';
import { moderateScale } from '@/styles';
import { DriverStopStatus, StopItemCardProps } from './types.d';
import * as S from './StopItemCard.styles';

export const StopItemCard: React.FC<StopItemCardProps> = React.memo(
  ({
    stop,
    isLast,
    subtitle,
    chatAccessibilityLabel,
    callAccessibilityLabel,
    onChatPress,
    onCallPress,
  }) => {
    const theme = useTheme();
    const isActive = stop.status === DriverStopStatus.ACTIVE;

    return (
      <S.StopCard>
        <S.TimelineColumn>
          <S.TimelineDot $active={isActive} />
          {!isLast && <S.TimelineLine />}
        </S.TimelineColumn>

        <Avatar
          source={
            stop.passengerAvatar ? { uri: stop.passengerAvatar } : undefined
          }
          placeholder={stop.passengerName}
          size="md"
        />

        <S.PassengerInfo>
          <S.PassengerNameText>{stop.passengerName}</S.PassengerNameText>
          {!!(stop.distanceAway || subtitle) && (
            <S.PassengerSubtitleRow>
              <Icon
                name="navigation"
                size={moderateScale(12)}
                color={theme.colors.primary}
              />
              <S.PassengerSubtitleText numberOfLines={1}>
                {stop.distanceAway || subtitle}
              </S.PassengerSubtitleText>
            </S.PassengerSubtitleRow>
          )}
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
      </S.StopCard>
    );
  },
);

StopItemCard.displayName = 'StopItemCard';
