import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { ProfileHeader } from '@/components/organisms/ProfileHeader';
import { TrustScoreCard } from '@/components/organisms/TrustScoreCard';
import { ProfileMenuItem } from '@/components/molecules/ProfileMenuItem';
import { BottomNav } from '@/components/organisms/BottomNav';
import { useProfileHub } from './useProfileHub';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { 
  Container, 
  Content, 
  Section, 
  SectionTitle, 
  BentoGrid, 
  ActionGrid, 
  DangerSection, 
  DangerButton,
} from './ProfileHub.styles';

export const ProfileHubScreen: React.FC = () => {
  const { 
    t,
    user,
    navigateToEditProfile,
    navigateToVehicleDetails,
    navigateToTravelPreferences,
    navigateToSettings,
    navigateToDummy,
  } = useProfileHub();
  const theme = useTheme();

  return (
    <ScreenShell>
      <Container showsVerticalScrollIndicator={false}>
        <Content>
          <BentoGrid>
            <ProfileHeader 
              name={user?.name || 'User'}
              rating={4.9}
              rides={128}
              memberSince={2024}
              avatarUri={user?.profilePhotoUrl}
              onEditPress={navigateToEditProfile}
              onSettingsPress={navigateToSettings}
            />
            <TrustScoreCard score={98} />
          </BentoGrid>

          <Section>
            <SectionTitle>
              <Typography variant="label" size="sm" weight="bold" color="on_surface_variant" style={{ letterSpacing: 2 }}>
                {t('profileHub.accountManagement')}
              </Typography>
            </SectionTitle>
            <ActionGrid>
              <ProfileMenuItem 
                icon="person-outline" 
                title={t('profileHub.editProfile')} 
                subtitle={t('profileHub.editProfileDescr')} 
                onPress={navigateToEditProfile}
              />

              <ProfileMenuItem 
                icon="verified-user" 
                title={t('profileHub.identityVerification')} 
                subtitle={t('profileHub.identityVerificationDescr')} 
                onPress={() => navigateToDummy(t('profileHub.identityVerification'), { showBack: true })}
              />
              <ProfileMenuItem 
                icon="directions-car" 
                title={t('vehicleDetails.headerTitle')} 
                subtitle={t('vehicleDetails.heroSubtitle')} 
                onPress={navigateToVehicleDetails}
              />

              <ProfileMenuItem 
                icon="tune" 
                title={t('profileHub.travelPreferences')} 
                subtitle={t('profileHub.travelPreferencesDescr')} 
                onPress={navigateToTravelPreferences}
              />
            </ActionGrid>
          </Section>

          <Section>
            <SectionTitle>
              <Typography variant="label" size="sm" weight="bold" color="on_surface_variant" style={{ letterSpacing: 2 }}>
                {t('profileHub.supportLegal')}
              </Typography>
            </SectionTitle>
            <ActionGrid>
              <ProfileMenuItem 
                icon="help-outline" 
                title={t('profileHub.helpSupport')} 
                showChevron={false} 
                onPress={() => navigateToDummy(t('profileHub.helpSupport'), { contentKey: 'help' })}
              />
              <ProfileMenuItem 
                icon="info" 
                title={t('profileHub.aboutUs')} 
                showChevron={false} 
                onPress={() => navigateToDummy(t('profileHub.aboutUs'), { contentKey: 'about' })}
              />
              <ProfileMenuItem 
                icon="policy" 
                title={t('profileHub.termsPrivacy')} 
                showChevron={false} 
                onPress={() => navigateToDummy(t('profileHub.termsPrivacy'), { contentKey: 'terms' })}
              />
            </ActionGrid>
          </Section>
        </Content>
      </Container>

      <BottomNav activeTab="PROFILE" />
    </ScreenShell>
  );
};


