import React from 'react';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { IconButton } from '@/components/atoms/IconButton';
import { ProfileHeader } from '@/components/organisms/ProfileHeader';
import { TrustScoreCard } from '@/components/organisms/TrustScoreCard';
import { ProfileMenuItem } from '@/components/molecules/ProfileMenuItem';
import { BottomNav } from '@/components/organisms/BottomNav';
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

import { useTranslation } from '@/hooks/useTranslation';

export const ProfileHubScreen: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>


      <Container showsVerticalScrollIndicator={false}>
        <Content>
          <BentoGrid>
            <ProfileHeader 
              name="Alex Rivera"
              rating={4.9}
              rides={128}
              memberSince={2023}
              avatarUri="https://randomuser.me/api/portraits/men/32.jpg"
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
              />
              <ProfileMenuItem 
                icon="verified-user" 
                title={t('profileHub.identityVerification')} 
                subtitle={t('profileHub.identityVerificationDescr')} 
              />
              <ProfileMenuItem 
                icon="tune" 
                title={t('profileHub.travelPreferences')} 
                subtitle={t('profileHub.travelPreferencesDescr')} 
              />
              <ProfileMenuItem 
                icon="payments" 
                title={t('profileHub.paymentMethods')} 
                subtitle={t('profileHub.paymentMethodsDescr')} 
              />
              <ProfileMenuItem 
                icon="star-rate" 
                title={t('profileHub.ratingsReviews')} 
                subtitle={t('profileHub.ratingsReviewsDescr')} 
              />
              <ProfileMenuItem 
                icon="lock-reset" 
                title={t('profileHub.changePassword')} 
                subtitle={t('profileHub.changePasswordDescr')} 
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
              <ProfileMenuItem icon="help-outline" title={t('profileHub.helpSupport')} showChevron={false} />
              <ProfileMenuItem icon="info" title={t('profileHub.aboutUs')} showChevron={false} />
              <ProfileMenuItem icon="policy" title={t('profileHub.termsPrivacy')} showChevron={false} />
            </ActionGrid>
          </Section>

          <DangerSection>
            <DangerButton>
              <Icon name="logout" size={24} color={theme.colors.error} />
              <Typography variant="body" weight="bold" color={theme.colors.error}>
                {t('profileHub.logout')}
              </Typography>
            </DangerButton>
            <DangerButton>
              <Icon name="delete-forever" size={24} color={theme.colors.outline} />
              <Typography variant="body" weight="bold" color={theme.colors.outline}>
                {t('profileHub.deleteAccount')}
              </Typography>
            </DangerButton>
          </DangerSection>
        </Content>
      </Container>

      <BottomNav activeTab="PROFILE" />
    </SafeAreaView>
  );
};

