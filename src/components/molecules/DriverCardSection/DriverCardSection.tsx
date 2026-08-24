import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Avatar } from '@/components/atoms/Avatar';
import { moderateScale } from '@/styles';
import { DriverCardSectionProps } from './types';
import * as S from './DriverCardSection.styles';

export const DriverCardSection: React.FC<DriverCardSectionProps> = React.memo(
  ({ driver, chatLabel, callLabel, onChatPress, onCallPress }) => {
    const theme = useTheme();

    return (
      <S.DriverCard>
        <S.DriverHeaderRow>
          <S.AvatarWrapper>
            <Avatar
              source={driver.avatar ? { uri: driver.avatar } : undefined}
              placeholder={driver.name}
              size="lg"
            />
            <S.RatingBadge>
              <S.RatingBadgeText>{driver.rating.toFixed(1)}</S.RatingBadgeText>
            </S.RatingBadge>
          </S.AvatarWrapper>

          <S.DriverInfo>
            <S.DriverNameText>{driver.name}</S.DriverNameText>
            <S.VehicleInfoText>
              {driver.vehicleModel}
              {driver.licensePlate ? (
                <>
                  {' • '}
                  <S.LicensePlateText>{driver.licensePlate}</S.LicensePlateText>
                </>
              ) : null}
            </S.VehicleInfoText>
            {!!driver.phone && (
              <S.VehicleInfoText>{driver.phone}</S.VehicleInfoText>
            )}
          </S.DriverInfo>
        </S.DriverHeaderRow>

        <S.ActionButtonsGrid>
          <S.ChatButton onPress={onChatPress}>
            <Icon
              name="chat"
              size={moderateScale(18)}
              color={theme.colors.on_primary}
            />
            <S.ChatButtonText>{chatLabel}</S.ChatButtonText>
          </S.ChatButton>

          <S.CallButton onPress={onCallPress}>
            <Icon
              name="call"
              size={moderateScale(18)}
              color={theme.colors.primary}
            />
            <S.CallButtonText>{callLabel}</S.CallButtonText>
          </S.CallButton>
        </S.ActionButtonsGrid>
      </S.DriverCard>
    );
  },
);

DriverCardSection.displayName = 'DriverCardSection';
