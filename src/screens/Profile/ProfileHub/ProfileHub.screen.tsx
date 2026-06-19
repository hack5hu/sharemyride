import React from 'react';
import { ProfileHubTemplate } from '@/components/templates/ProfileHubTemplate';
import { useProfileHub } from './useProfileHub';

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
  } = useProfileHub();

  return (
    <ProfileHubTemplate
      t={t}
      user={user}
      isUpdatingAvatar={isUpdatingAvatar}
      handleAvatarEdit={handleAvatarEdit}
      navigateToEditProfile={navigateToEditProfile}
      navigateToVehicleDetails={navigateToVehicleDetails}
      navigateToTravelPreferences={navigateToTravelPreferences}
      navigateToSettings={navigateToSettings}
      navigateToTermsAndConditions={navigateToTermsAndConditions}
      navigateToAboutUs={navigateToAboutUs}
      navigateToHelpAndSupport={navigateToHelpAndSupport}
      navigateToSuggestions={navigateToSuggestions}
      isAvatarModalVisible={isAvatarModalVisible}
      setAvatarModalVisible={setAvatarModalVisible}
      handleOpenGallery={handleOpenGallery}
      handleRemoveAvatar={handleRemoveAvatar}
      rating={rating}
      rides={rides}
      memberSince={memberSince}
      isVerified={isVerified}
    />
  );
};
