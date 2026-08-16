import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { VerifiedBadge } from '@/components/atoms/VerifiedBadge';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import * as S from '../RideInformationTemplate.styles';

export interface DriverCardProps {
  driver: {
    id: string;
    name: string;
    avatar?: string;
    driverPhotoUrl?: string;
    rating: number;
    rideCount: number;
    isVerified?: boolean;
  };
  handleDriverProfile: () => void;
  handleChat: () => void;
  showChat?: boolean;
  isCompleted?: boolean;
}

export const DriverCard: React.FC<DriverCardProps> = React.memo(
  ({ driver, handleDriverProfile, handleChat, showChat = true, isCompleted }) => {
    const theme = useTheme();
    const locale = useLocale();

    return (
      <S.DriverCard>
        <S.DriverInfoGroup onPress={handleDriverProfile}>
          <S.AvatarWrapper>
            <Avatar
              source={{ uri: driver.driverPhotoUrl || driver.avatar }}
              placeholder={driver.name}
              size="md"
              border
            />
            {driver.isVerified && (
              <S.BadgePin>
                <VerifiedBadge size={20} />
              </S.BadgePin>
            )}
          </S.AvatarWrapper>

          <S.DriverTextGroup>
            <Typography variant="title" size="sm" weight="bold">
              {driver.name}
            </Typography>
            <S.VerifiedRow>
              <Icon
                name="star"
                size={moderateScale(13)}
                color={theme.colors.warning}
              />
              <Typography
                variant="label"
                size="xs"
                weight="bold"
                color="on_surface_variant"
              >
                {driver.rating}
              </Typography>
            </S.VerifiedRow>
          </S.DriverTextGroup>
        </S.DriverInfoGroup>

        <S.DriverActions>
          {isCompleted && driver.hasRated && (
            <S.RatedBadge>
              <Icon
                name="check-circle"
                size={moderateScale(16)}
                color={theme.colors.on_surface_variant}
              />
              <Typography
                variant="label"
                size="xs"
                weight="bold"
                color="on_surface_variant"
              >
                {locale.rating?.ratedStatus || 'Rated'}
              </Typography>
            </S.RatedBadge>
          )}

          {showChat && (
            <S.ChatButton onPress={handleChat} activeOpacity={0.8}>
              <Icon
                name="chat-bubble-outline"
                size={moderateScale(20)}
                color={theme.colors.primary}
              />
            </S.ChatButton>
          )}
        </S.DriverActions>
      </S.DriverCard>
    );
  },
);
