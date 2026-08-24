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
        <S.DriverInfoGroup onPress={handleDriverProfile} activeOpacity={0.7}>
          <S.AvatarWrapper>
            <Avatar
              source={{ uri: driver.driverPhotoUrl || driver.avatar }}
              placeholder={driver.name}
              size="md"
            />
            {driver.isVerified && (
              <S.BadgePin>
                <VerifiedBadge size={18} />
              </S.BadgePin>
            )}
          </S.AvatarWrapper>

          <S.DriverTextGroup>
            <S.DriverNameRow>
              <Typography variant="title" size="sm" weight="bold">
                {driver.name}
              </Typography>
              <Icon
                name="chevron-right"
                size={moderateScale(18)}
                color={theme.colors.on_surface_variant}
              />
            </S.DriverNameRow>

            <S.DriverMetaRow>
              <S.RatingPill>
                <Icon
                  name="star"
                  size={moderateScale(13)}
                  color={theme.colors.warning || '#f59e0b'}
                />
                <Typography
                  variant="label"
                  size="xs"
                  weight="bold"
                  color={theme.colors.on_surface}
                >
                  {Number(driver.rating || 5).toFixed(1)}
                </Typography>
              </S.RatingPill>

              {driver.rideCount !== undefined && driver.rideCount > 0 && (
                <S.MetaBadge>
                  <Typography
                    variant="label"
                    size="xs"
                    weight="medium"
                    color={theme.colors.on_surface_variant}
                  >
                    {driver.rideCount} rides
                  </Typography>
                </S.MetaBadge>
              )}

              {driver.isVerified && (
                <S.VerifiedPill>
                  <Icon
                    name="verified"
                    size={moderateScale(12)}
                    color={theme.colors.primary}
                  />
                  <Typography
                    variant="label"
                    size="xs"
                    weight="bold"
                    color={theme.colors.primary}
                  >
                    Verified
                  </Typography>
                </S.VerifiedPill>
              )}
            </S.DriverMetaRow>
          </S.DriverTextGroup>
        </S.DriverInfoGroup>

        <S.DriverActions>
          {isCompleted && (driver as any).hasRated && (
            <S.RatedBadge>
              <Icon
                name="check-circle"
                size={moderateScale(14)}
                color={theme.colors.on_surface_variant}
              />
              <Typography
                variant="label"
                size="xs"
                weight="bold"
                color={theme.colors.on_surface_variant}
              >
                {locale.rating?.ratedStatus || 'Rated'}
              </Typography>
            </S.RatedBadge>
          )}

          {showChat && (
            <S.ChatButton onPress={handleChat} activeOpacity={0.8}>
              <Icon
                name="chat-bubble"
                size={moderateScale(18)}
                color={theme.colors.primary}
              />
            </S.ChatButton>
          )}
        </S.DriverActions>
      </S.DriverCard>
    );
  },
);
