import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { ProfileHeader } from '@/components/organisms/ProfileHeader';
import { ProfileMenuItem } from '@/components/molecules/ProfileMenuItem';
import { BottomNav } from '@/components/organisms/BottomNav';
import { useProfileHub } from './useProfileHub';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { ActionSheetModal } from '@/components/organisms/ActionSheetModal';
import {
  Container,
  Content,
  Section,
  SectionTitle,
  BentoGrid,
  ActionGrid,
} from './ProfileHub.styles';

export const ProfileHubScreen: React.FC = () => {
  const {
    t,
    user,
    isUpdatingAvatar,
    handleAvatarEdit,
    navigateToEditProfile,
    navigateToVehicleDetails,
    navigateToTravelPreferences,
    navigateToSettings,
    navigateToDummy,
    navigateToTermsAndConditions,
    navigateToAboutUs,
    navigateToHelpAndSupport,
    navigateToSuggestions,
    isAvatarModalVisible,
    setAvatarModalVisible,
    handleOpenGallery,
    handleRemoveAvatar,
  } = useProfileHub();

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
              onAvatarEditPress={handleAvatarEdit}
              isUpdatingAvatar={isUpdatingAvatar}
            />
            {/* <TrustScoreCard score={98} /> */}
          </BentoGrid>

          <Section>
            <SectionTitle>
              <Typography
                variant="label"
                size="sm"
                weight="bold"
                color="on_surface_variant"
                style={{ letterSpacing: 2 }}
              >
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
                onPress={() =>
                  navigateToDummy(t('profileHub.identityVerification'), {
                    showBack: true,
                  })
                }
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
              <Typography
                variant="label"
                size="sm"
                weight="bold"
                color="on_surface_variant"
                style={{ letterSpacing: 2 }}
              >
                {t('profileHub.supportLegal')}
              </Typography>
            </SectionTitle>
            <ActionGrid>
              <ProfileMenuItem
                icon="help-outline"
                title={t('profileHub.helpSupport')}
                showChevron={false}
                onPress={navigateToHelpAndSupport}
              />
              <ProfileMenuItem
                icon="feedback"
                title={t('profileHub.suggestionsFeedback')}
                subtitle={t('profileHub.suggestionsFeedbackDescr')}
                onPress={navigateToSuggestions}
              />
              <ProfileMenuItem
                icon="info"
                title={t('profileHub.aboutUs')}
                showChevron={false}
                onPress={navigateToAboutUs}
              />
              <ProfileMenuItem
                icon="policy"
                title={t('profileHub.termsPrivacy')}
                showChevron={false}
                onPress={navigateToTermsAndConditions}
              />
            </ActionGrid>
          </Section>
        </Content>
      </Container>

      <BottomNav activeTab="PROFILE" />

      <ActionSheetModal
        isVisible={isAvatarModalVisible}
        onClose={() => setAvatarModalVisible(false)}
        title={t('profileHub.editProfilePic') || 'Edit Profile Picture'}
        options={[
          {
            id: 'gallery',
            label: t('profileHub.chooseFromGallery'),
            icon: 'photo-library',
            onPress: handleOpenGallery,
          },
          ...(user?.profilePhotoUrl
            ? [
                {
                  id: 'remove',
                  label: t('profileHub.removePhoto'),
                  icon: 'delete-outline',
                  isDestructive: true,
                  onPress: handleRemoveAvatar,
                },
              ]
            : []),
        ]}
      />
    </ScreenShell>
  );
};
