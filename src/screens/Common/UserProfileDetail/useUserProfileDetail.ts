import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useState, useEffect, useCallback } from 'react';
import { Linking } from 'react-native';
import { UserService } from '@/serviceManager/UserService';
import { computeTotalRides } from '@/utils/user';
import { useLocale } from '@/constants/localization';
import { UserProfile } from './types';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { mapUserPreferences, mapUserReviews } from './userProfileHelper';

export const useUserProfileDetail = (
  userId: string,
  isDriver?: boolean,
  canChat?: boolean,
  canCall?: boolean,
) => {
  const navigation = useAppNavigation();
  const { userProfileDetail: t } = useLocale();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReportVisible, setIsReportVisible] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [profileData, ratingsData] = await Promise.all([
        UserService.getUserProfile(userId),
        UserService.getUserRatings(userId).catch(() => []),
      ]);

      const preferences = mapUserPreferences(profileData.preference);
      const mappedReviews = mapUserReviews(ratingsData);
      const totalRatingsCount = mappedReviews.length;

      const avgScore =
        profileData.rating && profileData.rating > 0
          ? Number(profileData.rating)
          : totalRatingsCount > 0
          ? Number(
              (
                mappedReviews.reduce((acc, r) => acc + r.rating, 0) /
                totalRatingsCount
              ).toFixed(1),
            )
          : 0;

      const totalRides = computeTotalRides(profileData);

      const mappedProfile: UserProfile = {
        id: profileData.userId || userId,
        name: profileData.name?.trim() || 'Unknown User',
        phoneNumber: profileData.phoneNumber || profileData.phone || undefined,
        profileImage: profileData.profilePhotoUrl,
        bio:
          profileData.bio && profileData.bio.trim()
            ? profileData.bio.trim()
            : undefined,
        isVerified:
          profileData.phoneVerified || profileData.emailVerified || false,
        rating: avgScore > 0 ? avgScore : 5,
        ratingCount: totalRatingsCount,
        ridesCount: totalRides,
        preferences,
        vehicle: profileData.vehicle
          ? {
              model: profileData.vehicle.model,
              color: profileData.vehicle.color,
              plateNumber: profileData.vehicle.plateNumber,
              type: profileData.vehicle.type || 'electric',
              tag: profileData.vehicle.tag || 'EV Eco-Friendly',
            }
          : undefined,
        reviews: mappedReviews,
      };

      setProfile(mappedProfile);
    } catch (err: any) {
      console.error('Failed to fetch user profile:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleReport = useCallback(() => {
    setIsReportVisible(true);
  }, []);

  const onReportClose = useCallback(() => {
    setIsReportVisible(false);
  }, []);

  const onReportSubmit = useCallback(
    async (data: { categoryId: string; reason?: string; description: string }) => {
      setIsReportVisible(false);
      try {
        await UserService.reportUser({
          reportedUserId: userId,
          reason: data.reason || data.categoryId.toUpperCase(),
          description: data.description,
        });
        showNotification(
          NotificationType.SUCCESS,
          'Report Submitted',
          'Thank you for reporting. Our team will review this user.',
        );
      } catch (e: any) {
        console.error('Report submission error:', e);
        showNotification(
          NotificationType.ERROR,
          'Submission Failed',
          e?.response?.data?.message ||
            e?.message ||
            'Failed to submit report. Please try again.',
        );
      }
    },
    [userId],
  );

  const handleViewRatings = useCallback(() => {
    if (profile) {
      navigation.navigate('UserRatings', {
        userId: profile.id,
        userName: profile.name,
      });
    }
  }, [navigation, profile]);

  const handleChat = useCallback(() => {
    if (profile && (isDriver || canChat)) {
      navigation.navigate('ChatDetails', {
        userId: profile.id,
        name: profile.name,
        avatarUri: profile.profileImage,
      });
    }
  }, [navigation, profile, isDriver, canChat]);

  const handleCall = useCallback(() => {
    const phone = profile?.phoneNumber;
    if (phone && (isDriver || canCall)) {
      Linking.openURL(`tel:${phone}`).catch(err => {
        console.error('Failed to open dialer:', err);
      });
    }
  }, [profile?.phoneNumber, isDriver, canCall]);

  return {
    profile,
    isLoading,
    error,
    handleBack,
    handleReport,
    handleViewRatings,
    handleChat: isDriver || canChat ? handleChat : undefined,
    handleCall:
      (isDriver || canCall) && profile?.phoneNumber ? handleCall : undefined,
    isReportVisible,
    onReportClose,
    onReportSubmit,
    t,
  };
};
