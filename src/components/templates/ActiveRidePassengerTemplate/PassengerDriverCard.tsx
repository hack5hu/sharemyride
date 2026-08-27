import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Avatar } from '@/components/atoms/Avatar';
import { moderateScale } from '@/styles';
import { DriverDetails } from './types.d';
import * as S from './PassengerDriverCard.styles';

export interface PassengerDriverCardProps {
  driver: DriverDetails;
  chatLabel: string;
  callLabel: string;
  onChatPress: () => void;
  onCallPress: () => void;
}

export const PassengerDriverCard: React.FC<PassengerDriverCardProps> = React.memo(
  ({ driver, chatLabel, callLabel, onChatPress, onCallPress }) => {
    const theme = useTheme();

    return (
      <S.DriverCard>
        <S.DriverHeaderRow>
          <S.AvatarWrapper>
            <Avatar
              source={driver.avatar ? { uri: driver.avatar } : undefined}
              placeholder={driver.name}
              size="md"
            />
            <S.RatingBadge>
              <Icon name="star" size={moderateScale(10)} color="#ffffff" />
              <S.RatingBadgeText>
                {Number(driver.rating || 5).toFixed(1)}
              </S.RatingBadgeText>
            </S.RatingBadge>
          </S.AvatarWrapper>

          <S.DriverInfo>
            <S.DriverNameRow>
              <S.DriverNameText numberOfLines={1}>{driver.name}</S.DriverNameText>
              <Icon
                name="verified"
                size={moderateScale(16)}
                color={theme.colors.primary}
              />
            </S.DriverNameRow>
            {!!driver.phone && (
              <S.DriverPhoneText numberOfLines={1}>{driver.phone}</S.DriverPhoneText>
            )}
          </S.DriverInfo>
        </S.DriverHeaderRow>

        <S.ActionButtonsGrid>
          <S.ChatButton onPress={onChatPress} activeOpacity={0.8}>
            <Icon
              name="chat"
              size={moderateScale(17)}
              color={theme.colors.on_primary}
            />
            <S.ChatButtonText>{chatLabel}</S.ChatButtonText>
          </S.ChatButton>

          <S.CallButton onPress={onCallPress} activeOpacity={0.75}>
            <Icon
              name="call"
              size={moderateScale(17)}
              color={theme.colors.primary}
            />
            <S.CallButtonText>{callLabel}</S.CallButtonText>
          </S.CallButton>
        </S.ActionButtonsGrid>
      </S.DriverCard>
    );
  },
);

PassengerDriverCard.displayName = 'PassengerDriverCard';
