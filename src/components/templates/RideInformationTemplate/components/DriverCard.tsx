import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { VerifiedBadge } from '@/components/atoms/VerifiedBadge';
import { moderateScale } from '@/styles';
import { useLocale } from '@/constants/localization';
import * as S from '../RideInformationTemplate.styles';

export interface DriverCardProps {
  driver: {
    id: string;
    name: string;
    avatar?: string;
    driverPhotoUrl?: string;
    rating: number;
    rideCount: number;
  };
  handleDriverProfile: () => void;
  handleChat: () => void;
  showChat?: boolean;
}

export const DriverCard: React.FC<DriverCardProps> = React.memo(({
  driver,
  handleDriverProfile,
  handleChat,
  showChat = true,
}) => {
  const theme = useTheme();
  const translations = useLocale();

  return (
    <S.DriverCard>
      <S.DriverInfoGroup onPress={handleDriverProfile}>
        <S.AvatarWrapper>
          <Avatar
            source={{ uri: driver.driverPhotoUrl || driver.avatar }}
            size="md"
            border
          />
          <S.BadgePin>
            <VerifiedBadge size={14} />
          </S.BadgePin>
        </S.AvatarWrapper>

        <S.DriverTextGroup>
          <Typography variant="title" size="sm" weight="bold">
            {driver.name}
          </Typography>
          <S.VerifiedRow>
            <Icon name="star" size={moderateScale(13)} color={theme.colors.warning} />
            <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
              {driver.rating} · {driver.rideCount} {translations.rideDetails.ridesLabel}
            </Typography>
          </S.VerifiedRow>
        </S.DriverTextGroup>
      </S.DriverInfoGroup>

      {showChat && (
        <S.ChatButton onPress={handleChat} activeOpacity={0.8}>
          <Icon name="chat-bubble-outline" size={moderateScale(20)} color={theme.colors.primary} />
        </S.ChatButton>
      )}
    </S.DriverCard>
  );
});
