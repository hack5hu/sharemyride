import React from 'react';
import { ProfileMenuItem } from '@/components/molecules/ProfileMenuItem';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { ActionSheetModal } from '@/components/organisms/ActionSheetModal';
import { BottomNav } from '@/components/organisms/BottomNav';
import { ProfileHeader } from '@/components/organisms/ProfileHeader';
import {
  Container,
  Content,
  Section,
  SectionTitle,
  SectionTitleText,
  BentoGrid,
  ActionGrid,
} from './ProfileHubTemplate.styles';
import { type ProfileHubTemplateProps } from './types.d';

export const ProfileHubTemplate: React.FC<ProfileHubTemplateProps> = ({
  t,
  user,
  isUpdatingAvatar,
  handleAvatarEdit,
  navigateToEditProfile,
  navigateToVehicleDetails,
  navigateToTravelPreferences,
  navigateToSettings,
  navigateToTermsAndConditions,
  navigateToPrivacyPolicy,
  navigateToAboutUs,
  navigateToHelpAndSupport,
  navigateToSuggestions,
  isAvatarModalVisible,
  setAvatarModalVisible,
  handleOpenGallery,
  handleRemoveAvatar,
  rating,
  rides,
  memberSince,
  isVerified,
}) => {
  return (
    <ScreenShell noPaddingBottom>
      <Container showsVerticalScrollIndicator={false}>
        <Content>
          <BentoGrid>
            <ProfileHeader
              name={user?.name || 'User'}
              rating={rating}
              rides={rides}
              memberSince={memberSince}
              isVerified={isVerified}
              avatarUri={user?.profilePhotoUrl}
              onEditPress={navigateToEditProfile}
              onSettingsPress={navigateToSettings}
              onAvatarEditPress={handleAvatarEdit}
              isUpdatingAvatar={isUpdatingAvatar}
            />
          </BentoGrid>

          <Section>
            <SectionTitle>
              <SectionTitleText>
                {t('profileHub.accountManagement')}
              </SectionTitleText>
            </SectionTitle>
            <ActionGrid>
              <ProfileMenuItem
                icon="person-outline"
                title={t('profileHub.editProfile')}
                subtitle={t('profileHub.editProfileDescr')}
                onPress={navigateToEditProfile}
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
              <SectionTitleText>
                {t('profileHub.supportLegal')}
              </SectionTitleText>
            </SectionTitle>
            <ActionGrid>
              <ProfileMenuItem
                icon="feedback"
                title={t('profileHub.suggestionsFeedback')}
                subtitle={t('profileHub.suggestionsFeedbackDescr')}
                onPress={navigateToSuggestions}
              />
              <ProfileMenuItem
                icon="help-outline"
                title={t('profileHub.helpSupport')}
                subtitle={t('profileHub.helpSupportDescr')}
                onPress={navigateToHelpAndSupport}
              />
              <ProfileMenuItem
                icon="info"
                title={t('profileHub.aboutUs')}
                subtitle={t('profileHub.aboutUsDescr')}
                onPress={navigateToAboutUs}
              />
              <ProfileMenuItem
                icon="gavel"
                title={t('profileHub.termsConditions') || 'Terms & Conditions'}
                subtitle={t('profileHub.termsConditionsDescr')}
                onPress={navigateToTermsAndConditions}
              />
              <ProfileMenuItem
                icon="policy"
                title={t('profileHub.privacyPolicy') || 'Privacy Policy'}
                subtitle={t('profileHub.privacyPolicyDescr')}
                onPress={navigateToPrivacyPolicy}
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
