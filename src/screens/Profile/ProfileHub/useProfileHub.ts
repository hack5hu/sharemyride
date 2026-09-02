import { useCallback, useState, useEffect, useMemo } from 'react';
import { Linking, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { UserService } from '@/serviceManager/UserService';
import { useAuthStore } from '@/store/useAuthStore';
import { computeTotalRides } from '@/utils/user';

export const useProfileHub = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const { user, fetchProfile } = useAuthStore();
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [isAvatarModalVisible, setAvatarModalVisible] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleAvatarEdit = useCallback(() => {
    if (isUpdatingAvatar) return;
    setAvatarModalVisible(true);
  }, [isUpdatingAvatar]);

  const handleOpenGallery = useCallback(async () => {
    setAvatarModalVisible(false);
    // On iOS, modal dismissal is animated. We wait for dismissal to complete before presenting the image picker.
    const delay = Platform.OS === 'ios' ? 350 : 0;
    setTimeout(async () => {
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

        await UserService.uploadProfilePhoto(selectedImage.uri!);

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
    }, delay);
  }, [fetchProfile, t]);

  const handleRemoveAvatar = useCallback(async () => {
    setAvatarModalVisible(false);
    try {
      setIsUpdatingAvatar(true);
      await UserService.deleteProfilePhoto();

      await fetchProfile();
      showNotification(
        NotificationType.SUCCESS,
        t('notification.defaultSuccessTitle'),
        t('notification.profilePhotoUpdated'), // We can use the same generic success message or a new one
      );
    } catch {
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        t('notification.defaultErrorMessage'),
      );
    } finally {
      setIsUpdatingAvatar(false);
    }
  }, [fetchProfile, t]);

  const navigateToEditProfile = useCallback(() => {
    navigation.navigate('EditProfile');
  }, [navigation]);

  const navigateToVehicleDetails = useCallback(() => {
    navigation.navigate('VehicleList');
  }, [navigation]);

  const navigateToTravelPreferences = useCallback(() => {
    navigation.navigate('TravelPreferences');
  }, [navigation]);

  const navigateToSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  const navigateToHelpAndSupport = useCallback(() => {
    Linking.openURL('https://www.zyncride.com/contact').catch(err =>
      console.error('Failed to open support URL', err),
    );
  }, []);

  const navigateToTermsAndConditions = useCallback(() => {
    Linking.openURL('https://www.zyncride.com/terms-and-conditions').catch(err =>
      console.error('Failed to open terms URL', err),
    );
  }, []);

  const navigateToPrivacyPolicy = useCallback(() => {
    Linking.openURL('https://www.zyncride.com/privacy-policy').catch(err =>
      console.error('Failed to open privacy policy URL', err),
    );
  }, []);

  const navigateToAboutUs = useCallback(() => {
    Linking.openURL('https://www.zyncride.com').catch(err =>
      console.error('Failed to open about us URL', err),
    );
  }, []);

  const navigateToSuggestions = useCallback(() => {
    navigation.navigate('Suggestions');
  }, [navigation]);

  const rating = useMemo(() => {
    return user?.rating !== undefined ? Number(user.rating) : 0;
  }, [user?.rating]);

  const rides = useMemo(() => {
    return computeTotalRides(user);
  }, [user]);

  const memberSince = useMemo(() => {
    if (user?.createdAt) {
      const date = new Date(String(user.createdAt));
      if (!isNaN(date.getTime())) {
        return date.getFullYear();
      }
    }

    return 2026;
  }, [user?.createdAt]);

  const isVerified = useMemo(() => {
    return !!(user?.emailVerified || user?.phoneVerified);
  }, [user?.emailVerified, user?.phoneVerified]);

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
    navigateToTermsAndConditions,
    navigateToPrivacyPolicy,
    navigateToAboutUs,
    navigateToHelpAndSupport,
    navigateToSuggestions,
    rating,
    rides,
    memberSince,
    isVerified,
  };
};
