import { useState, useCallback, useMemo } from 'react';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useLocale } from '@/constants/localization';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import rideService from '@/serviceManager/rideService';
import { getErrorMessage } from '@/utils/error';

export const useRating = (params: {
  rideId: string;
  targetUserId: string;
  targetUserName: string;
  targetUserRole: 'DRIVER' | 'PASSENGER';
}) => {
  const {
    rideId = '',
    targetUserId = 'user-123',
    targetUserName = 'Julianne Reed',
    targetUserRole = 'PASSENGER',
  } = params || {};
  const navigation = useAppNavigation();
  const { rating: t } = useLocale();

  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate categories based on target user role
  const categories = useMemo(() => {
    if (targetUserRole === 'DRIVER') {
      return [
        { key: 'cameOnTime', label: t.cameOnTime },
        { key: 'ridingExperience', label: t.ridingExperience },
        { key: 'talkingExperience', label: t.talkingExperience },
        { key: 'cleanliness', label: t.cleanliness },
        { key: 'behavior', label: t.behavior },
        { key: 'overall', label: t.overall },
      ];
    } else {
      return [
        { key: 'cameOnTime', label: t.cameOnTime },
        { key: 'talkingExperience', label: t.talkingExperience },
        { key: 'cleanliness', label: t.cleanliness },
        { key: 'behavior', label: t.behavior },
        { key: 'overall', label: t.overall },
      ];
    }
  }, [targetUserRole, t]);

  const onRatingChange = useCallback(
    (categoryKey: string, ratingValue: number) => {
      setRatings(prev => ({
        ...prev,
        [categoryKey]: ratingValue,
      }));
    },
    [],
  );

  const onReviewChange = useCallback((text: string) => {
    setReviewText(text);
  }, []);

  const onSubmit = useCallback(async () => {
    // Basic verification that all categories are rated
    const hasUnrated = categories.some(
      cat => !ratings[cat.key] || ratings[cat.key] === 0,
    );
    if (hasUnrated) {
      showNotification(NotificationType.ERROR, t.title, t.ratingRequired);
      return;
    }

    setIsSubmitting(true);
    try {
      // Calculate overall rating score
      const totalScore = Object.values(ratings).reduce(
        (sum, val) => sum + val,
        0,
      );
      const averageRating = totalScore / categories.length;

      // Submit using rideService
      await rideService.submitRating(
        rideId,
        targetUserId,
        averageRating,
        ratings,
        reviewText,
      );

      showNotification(
        NotificationType.SUCCESS,
        t.successTitle,
        t.successMessage,
      );

      navigation.goBack();
    } catch (error) {
      showNotification(
        NotificationType.ERROR,
        t.title,
        getErrorMessage(error, 'Could not submit feedback. Please try again.'),
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [categories, ratings, reviewText, rideId, targetUserId, navigation, t]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    t,
    targetUserName,
    targetUserRole,
    categories,
    ratings,
    onRatingChange,
    reviewText,
    onReviewChange,
    onSubmit,
    onBack,
    isSubmitting,
  };
};
