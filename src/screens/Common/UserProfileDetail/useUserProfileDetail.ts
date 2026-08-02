import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useState, useEffect, useCallback } from 'react';
import { UserService } from '@/serviceManager/UserService';
import { computeTotalRides } from '@/utils/user';
import { useLocale } from '@/constants/localization';
import { UserProfile } from './types';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';

export const useUserProfileDetail = (userId: string) => {
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
        UserService.getUserRatings(userId).catch(() => []), // fallback to empty array if ratings API fails
      ]);

      // Map preferences dynamically
      const preferences: { icon: string; label: string }[] = [];
      if (profileData.preference) {
        const pref = profileData.preference;
        if (pref.nonSmoking) {
          preferences.push({ icon: 'smoke-free', label: 'Non-smoking' });
        }
        if (pref.petFriendly) {
          preferences.push({ icon: 'pets', label: 'Pets allowed' });
        } else {
          preferences.push({ icon: 'block', label: 'No pets' });
        }
        if (pref.luggageAllowed) {
          preferences.push({ icon: 'business-center', label: 'Luggage allowed' });
        }
        if (pref.musicPreference && pref.musicPreference !== 'None') {
          preferences.push({
            icon: 'music-note',
            label: `${pref.musicPreference} music`,
          });
        }
        if (pref.womenOnly) {
          preferences.push({ icon: 'face', label: 'Ladies only' });
        }
      } else {
        preferences.push(
          { icon: 'smoke-free', label: 'Non-smoking' },
          { icon: 'pets', label: 'Pets allowed' },
          { icon: 'music-note', label: 'Lo-fi only' },
        );
      }

      // Map reviews
      const mappedReviews = (ratingsData || []).map((r: any) => ({
        id: String(r.ratingId),
        reviewerName: r.raterName || 'Anonymous',
        reviewerImage: r.raterPhotoUrl || undefined,
        rating: r.score,
        date: r.createdAt
          ? new Date(r.createdAt).toLocaleDateString([], {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
          : 'Recent',
        tripInfo: r.raterRole === 'DRIVER' ? 'Rode with them' : 'Passenger',
        comment: r.comment || '',
      }));

      const mappedProfile: UserProfile = {
        id: profileData.userId || userId,
        name: profileData.name || 'Unknown User',
        profileImage: profileData.profilePhotoUrl,
        bio: profileData.bio || t.defaultBio,
        isVerified: profileData.phoneVerified || profileData.emailVerified || false,
        rating: profileData.rating ?? 5,
        ratingCount: computeTotalRides(profileData) || ratingsData.length || 0,
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
  }, [userId, t.defaultBio]);

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
    if (profile) {
      navigation.navigate('ChatDetails', {
        userId: profile.id,
        name: profile.name,
        avatarUri: profile.profileImage,
      });
    }
  }, [navigation, profile]);

  return {
    profile,
    isLoading,
    error,
    handleBack,
    handleReport,
    handleViewRatings,
    handleChat,
    isReportVisible,
    onReportClose,
    onReportSubmit,
    t,
  };
};
