import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { useTranslation } from '@/hooks/useTranslation';
import { useCallback, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { launchImageLibrary } from 'react-native-image-picker';
import { userService } from '@/serviceManager/userService';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';

export const useProfileHub = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user, fetchProfile } = useAuthStore();
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);

  const handleAvatarEdit = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.didCancel || !result.assets?.[0]?.uri) {
        return;
      }

      setIsUpdatingAvatar(true);
      const selectedImage = result.assets[0];

      await userService.updateProfile({
        fullName: user?.name || '',
        dob: user?.dateOfBirth || '',
        gender: user?.gender || '',
        profileImage: { uri: selectedImage.uri },
      });

      await fetchProfile();
      showNotification(
        NotificationType.SUCCESS,
        t('notification.defaultSuccessTitle') || 'Success',
        t('notification.profilePhotoUpdated') || 'Profile photo updated successfully'
      );
    } catch (error) {
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle') || 'Error',
        t('notification.defaultErrorMessage') || 'Something went wrong'
      );
    } finally {
      setIsUpdatingAvatar(false);
    }
  }, [user, fetchProfile, t]);

  const navigateToEditProfile = useCallback(() => {
    navigation.navigate('EditProfile');
  }, [navigation]);

  const navigateToVehicleDetails = useCallback(() => {
    navigation.navigate('VehicleList');
  }, [navigation]);

  const navigateToTravelPreferences = useCallback(() => {
    navigation.navigate('TravelPreferences');
  }, [navigation]);

  const navigateToDummy = useCallback((title: string, options?: { 
    showBack?: boolean, 
    showBottomNav?: boolean, 
    contentKey?: 'about' | 'help' | 'terms' 
  }) => {
    navigation.navigate('Dummy', { title, ...options });
  }, [navigation]);

  const navigateToSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  const navigateToTermsAndConditions = useCallback(() => {
    navigation.navigate('TermsAndConditions');
  }, [navigation]);

  const navigateToAboutUs = useCallback(() => {
    navigation.navigate('AboutUs');
  }, [navigation]);

  const navigateToHelpAndSupport = useCallback(() => {
    navigation.navigate('HelpAndSupport');
  }, [navigation]);

  return {
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
  };
};

