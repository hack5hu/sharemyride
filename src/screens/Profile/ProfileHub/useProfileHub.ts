import { useAppNavigation } from '@/hooks/useAppNavigation';
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
  const navigation = useAppNavigation();
  const { user, fetchProfile } = useAuthStore();
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [isAvatarModalVisible, setAvatarModalVisible] = useState(false);

  const handleAvatarEdit = useCallback(() => {
    if (isUpdatingAvatar) return;
    setAvatarModalVisible(true);
  }, [isUpdatingAvatar]);

  const handleOpenGallery = useCallback(async () => {
    setAvatarModalVisible(false);
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

      await userService.uploadProfilePhoto(selectedImage.uri!);

      await fetchProfile();
      showNotification(
        NotificationType.SUCCESS,
        t('notification.defaultSuccessTitle'),
        t('notification.profilePhotoUpdated'),
      );
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        t('notification.defaultErrorMessage');
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        errorMessage,
      );
    } finally {
      setIsUpdatingAvatar(false);
    }
  }, [fetchProfile, t]);

  const handleRemoveAvatar = useCallback(async () => {
    setAvatarModalVisible(false);
    try {
      setIsUpdatingAvatar(true);
      await userService.deleteProfilePhoto();

      await fetchProfile();
      showNotification(
        NotificationType.SUCCESS,
        t('notification.defaultSuccessTitle'),
        t('notification.profilePhotoUpdated'), // We can use the same generic success message or a new one
      );
    } catch (error) {
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        t('notification.defaultErrorMessage'),
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

  const navigateToDummy = useCallback(
    (
      title: string,
      options?: {
        showBack?: boolean;
        showBottomNav?: boolean;
        contentKey?: 'about' | 'help' | 'terms';
      },
    ) => {
      navigation.navigate('Dummy', { title, ...options });
    },
    [navigation],
  );

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
    isAvatarModalVisible,
    setAvatarModalVisible,
    handleAvatarEdit,
    handleOpenGallery,
    handleRemoveAvatar,
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
