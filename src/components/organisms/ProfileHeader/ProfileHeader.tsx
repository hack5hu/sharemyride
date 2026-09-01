import React from 'react';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from '../../atoms/Avatar';
import { Typography } from '../../atoms/Typography';
import { Loader } from '../../atoms/Loader';
import { Badge } from '../../atoms/Badge';
import { StatItem } from '../../molecules/StatItem';
import { IconButton } from '../../atoms/IconButton';
import * as S from './ProfileHeader.styles';
import { useTranslation } from '@/hooks/useTranslation';

export interface ProfileHeaderProps {
  name: string;
  rating: number | string;
  rides: number | string;
  memberSince: string | number;
  isVerified?: boolean;
  avatarUri?: string;
  isUpdatingAvatar?: boolean;
  onEditPress?: () => void;
  onSettingsPress?: () => void;
  onAvatarEditPress?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  rating,
  rides,
  memberSince,
  isVerified = true,
  avatarUri,
  isUpdatingAvatar = false,
  onSettingsPress,
  onAvatarEditPress,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <S.HeaderCard>
      <S.SettingsButtonWrapper>
        <IconButton
          icon="settings"
          variant="surface"
          onPress={onSettingsPress}
        />
      </S.SettingsButtonWrapper>

      <S.IdentitySection>
        <S.AvatarWrapper
          onPress={onAvatarEditPress}
          disabled={isUpdatingAvatar || !onAvatarEditPress}
          isUpdating={isUpdatingAvatar}
          activeOpacity={0.8}
        >
          <Avatar
            source={avatarUri ? { uri: avatarUri } : undefined}
            size="xl"
            border
            placeholder={name}
          />
          {isUpdatingAvatar ? (
            <S.AvatarOverlay>
              <Loader transparent />
            </S.AvatarOverlay>
          ) : (
            <S.CameraBadge>
              <Icon
                name="photo-camera"
                size={16}
                color={theme.colors.on_primary}
              />
            </S.CameraBadge>
          )}
        </S.AvatarWrapper>

        <S.InfoSection>
          <S.NameRow>
            <Typography variant="title" size="lg" weight="bold">
              {name}
            </Typography>
            <Badge label={t('profileHub.proPooler')} variant="primary" />
          </S.NameRow>

          {isVerified && (
            <S.VerifiedBadgePill>
              <S.VerifiedIcon
                name="verified"
                size={16}
                color={theme.colors.primary}
              />
              <Typography variant="label" size="xs" color="primary" weight="bold">
                {t('profileHub.identityVerified')}
              </Typography>
            </S.VerifiedBadgePill>
          )}
        </S.InfoSection>
      </S.IdentitySection>

      <S.StatsBentoCard>
        <StatItem label={t('profileHub.rating')} value={rating} />
        <S.StatDivider />
        <StatItem label={t('profileHub.rides')} value={rides} />
        <S.StatDivider />
        <StatItem label={t('profileHub.memberSince')} value={memberSince} />
      </S.StatsBentoCard>
    </S.HeaderCard>
  );
};

