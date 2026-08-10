import React from 'react';
import { useTheme } from 'styled-components/native';
import styled from 'styled-components/native';

const StyledView = styled.View``;
const CenterView = styled.View`
  align-items: center;
`;
const AvatarOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 100px;
`;
const EditButton = styled.TouchableOpacity<{ isUpdating: boolean }>`
  margin-top: 8px;
  opacity: ${({ isUpdating }) => (isUpdating ? 0.5 : 1)};
`;
const NameRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
import { Avatar } from '../../atoms/Avatar';
import { Typography } from '../../atoms/Typography';
import { Loader } from '../../atoms/Loader';
import { Badge } from '../../atoms/Badge';
import { StatItem } from '../../molecules/StatItem';
import { IconButton } from '../../atoms/IconButton';
import {
  HeaderCard,
  IdentitySection,
  InfoSection,
  StatsSection,
  StatDivider,
  VerifiedRow,
  SettingsButtonWrapper,
  VerifiedIcon,
} from './ProfileHeader.styles';
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
    <HeaderCard>
      <SettingsButtonWrapper>
        <IconButton
          icon="settings"
          variant="surface"
          onPress={onSettingsPress}
        />
      </SettingsButtonWrapper>
      <IdentitySection>
      <CenterView>
          <StyledView>
            <Avatar
              source={avatarUri ? { uri: avatarUri } : undefined}
              size="xl"
              border
              placeholder={name}
            />
            {isUpdatingAvatar && (
              <AvatarOverlay>
                <Loader transparent />
              </AvatarOverlay>
            )}
          </StyledView>
          {onAvatarEditPress && (
            <EditButton
              onPress={onAvatarEditPress}
              disabled={isUpdatingAvatar}
              isUpdating={isUpdatingAvatar}
            >
              <Typography
                variant="label"
                size="lg"
                color="primary"
                weight="bold"
              >
                {t('profileHub.editProfilePic') || 'Edit'}
              </Typography>
            </EditButton>
          )}
        </CenterView>
        <InfoSection>
          <NameRow>
            <Typography variant="title" size="lg" weight="bold">
              {name}
            </Typography>
            <Badge label={t('profileHub.proPooler')} variant="primary" />
          </NameRow>
          {isVerified && (
            <VerifiedRow>
              <VerifiedIcon
                name="verified"
                size={18}
                color={theme.colors.primary}
              />
              <Typography variant="label" size="sm" color="on_surface_variant">
                {t('profileHub.identityVerified')}
              </Typography>
            </VerifiedRow>
          )}
        </InfoSection>
      </IdentitySection>

      <StatsSection>
        <StatItem label={t('profileHub.rating')} value={rating} />
        <StatDivider />
        <StatItem label={t('profileHub.rides')} value={rides} />
        <StatDivider />
        <StatItem label={t('profileHub.memberSince')} value={memberSince} />
      </StatsSection>
    </HeaderCard>
  );
};
