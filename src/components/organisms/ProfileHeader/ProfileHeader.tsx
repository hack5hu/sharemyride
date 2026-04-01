import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { View } from 'react-native';
import { Avatar } from '../../atoms/Avatar';
import { Typography } from '../../atoms/Typography';
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
  onEditPress?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  rating,
  rides,
  memberSince,
  isVerified = true,
  avatarUri,
  onEditPress,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <HeaderCard>
      <IconButton icon="settings" variant="surface" onPress={() => { }} style={{ position: 'absolute', top: 10, right: 10 }} />
      <IdentitySection>
        <View style={{ position: 'relative' }}>
          <Avatar 
            source={avatarUri ? { uri: avatarUri } : undefined} 
            size="xl" 
            border 
          />
          {/* <IconButton
            icon="edit"
            size="sm"
            variant="primary"
            style={{ position: 'absolute', bottom: -4, right: -4, borderRadius: 20 }}
            onPress={onEditPress}
          /> */}
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
