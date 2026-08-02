import { useState, useEffect, useCallback } from 'react';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { UserService } from '@/serviceManager/UserService';
import { UserReview } from '@/screens/Common/UserProfileDetail/types';

export const useUserRatings = (userId: string, userName: string) => {
  const navigation = useAppNavigation();
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRatings = useCallback(async () => {
    try {
      setIsLoading(true);
      const ratingsData = await UserService.getUserRatings(userId);
      
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

      setReviews(mappedReviews);
    } catch (error) {
      console.error('Failed to fetch ratings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    userName,
    reviews,
    isLoading,
    onBack,
  };
};
