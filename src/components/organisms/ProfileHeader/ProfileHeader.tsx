import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
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
  VerifiedRow 
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
  onEditPress,
  onSettingsPress,
  onAvatarEditPress,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <HeaderCard>
      <IconButton icon="settings" variant="surface" onPress={onSettingsPress} style={{ position: 'absolute', top: 10, right: 10 }} />
      <IdentitySection>
        <View style={{ alignItems: 'center' }}>
          <View>
            <Avatar 
              source={avatarUri ? { uri: avatarUri } : undefined} 
              size="xl" 
              border 
            />
            {isUpdatingAvatar && (
              <View style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: 100,
              }}>
                <Loader transparent />
              </View>
            )}
          </View>
          {onAvatarEditPress && (
            <TouchableOpacity onPress={onAvatarEditPress} disabled={isUpdatingAvatar} style={{ marginTop: 8, opacity: isUpdatingAvatar ? 0.5 : 1 }}>
              <Typography variant="label" size="lg" color="primary" weight="bold">
                {t('profileHub.editProfilePic') || 'Edit'}
              </Typography>
            </TouchableOpacity>
          )}
          
        </View>
        <InfoSection>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Typography variant="title" size="lg" weight="bold">
              {name}
            </Typography>
            <Badge label={t('profileHub.proPooler')} variant="primary" />
          </View>
          {isVerified && (
            <VerifiedRow>
              <Icon 
                name="verified" 
                size={18} 
                color={theme.colors.primary} 
                style={{ opacity: 0.8 }} 
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
