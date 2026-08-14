export interface ProfileHubUser {
  name: string;
  email?: string;
  phoneNumber?: string;
  photoUrl?: string;
}

export interface ProfileHubTemplateProps {
  t: unknown;
  user: ProfileHubUser | null;
  isUpdatingAvatar: boolean;
  handleAvatarEdit: () => void;
  navigateToEditProfile: () => void;
  navigateToVehicleDetails: () => void;
  navigateToTravelPreferences: () => void;
  navigateToSettings: () => void;
  navigateToTermsAndConditions: () => void;
  navigateToPrivacyPolicy: () => void;
  navigateToAboutUs: () => void;
  navigateToHelpAndSupport: () => void;
  navigateToSuggestions: () => void;
  isAvatarModalVisible: boolean;
  setAvatarModalVisible: (visible: boolean) => void;
  handleOpenGallery: () => void;
  handleRemoveAvatar: () => void;
  rating: number;
  rides: number;
  memberSince: number;
  isVerified: boolean;
}
