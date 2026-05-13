import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { userService } from '@/serviceManager/userService';
import { useLocale } from '@/constants/localization';
import { UserProfile } from './types';

export const useUserProfileDetail = (userId: string) => {
  const navigation = useNavigation();
  const { userProfileDetail: t } = useLocale();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await userService.getUserProfile(userId);
      
      // Basic mapping from API response to our UI interface
      // Note: In a real app, this mapping logic might be more complex
      const mappedProfile: UserProfile = {
        id: data.id || userId,
        name: data.name || 'Unknown User',
        profileImage: data.profileImage,
        isVerified: data.isVerified ?? true,
        rating: data.rating ?? 4.9,
        ratingCount: data.ratingCount ?? 124,
        preferences: data.preferences || [
          { icon: 'smoke_free', label: 'Non-smoking' },
          { icon: 'pets', label: 'Pets allowed' },
          { icon: 'music_note', label: 'Lo-fi only' },
        ],
        vehicle: data.vehicle ? {
          model: data.vehicle.model,
          color: data.vehicle.color,
          plateNumber: data.vehicle.plateNumber,
          type: data.vehicle.type || 'electric',
          tag: data.vehicle.tag || 'EV Eco-Friendly',
        } : {
          model: 'Tesla Model 3',
          color: 'Forest Green',
          plateNumber: 'ABC-1234',
          type: 'electric',
          tag: 'EV Eco-Friendly',
        },
        reviews: data.reviews || [
          {
            id: '1',
            reviewerName: 'Sarah Miller',
            rating: 5,
            date: '2 days ago',
            tripInfo: 'Trip to Downtown',
            comment: 'Alex was a great driver! The car was immaculate and the music selection was perfect for a Monday morning. Very professional.',
          },
          {
            id: '2',
            reviewerName: 'Michael Chen',
            rating: 4,
            date: '1 week ago',
            tripInfo: 'Late night commute',
            comment: 'Smooth ride and arrived exactly on time. Alex is quiet but very polite. Highly recommend for airport runs.',
          }
        ],
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
    // Implement report logic or navigate to report screen
    console.log('Reporting user:', userId);
  }, [userId]);

  const handleViewRatings = useCallback(() => {
    // Navigate to detailed ratings screen
    console.log('Viewing ratings for:', userId);
  }, [userId]);

  return {
    profile,
    isLoading,
    error,
    handleBack,
    handleReport,
    handleViewRatings,
    t,
  };
};
