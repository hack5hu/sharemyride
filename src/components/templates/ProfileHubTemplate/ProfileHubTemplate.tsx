import React from 'react';
import { ProfileHeader } from '@/components/organisms/ProfileHeader';
import { ProfileMenuItem } from '@/components/molecules/ProfileMenuItem';
import { BottomNav } from '@/components/organisms/BottomNav';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { ActionSheetModal } from '@/components/organisms/ActionSheetModal';
import { ProfileHubTemplateProps } from './types.d';
import {
  Container,
  Content,
  Section,
  SectionTitle,
  SectionTitleText,
  BentoGrid,
  ActionGrid,
} from './ProfileHubTemplate.styles';

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
