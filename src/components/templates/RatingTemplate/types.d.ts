import { type RatingTranslations } from '@/constants/localization/types';

export interface RatingTemplateProps {
  t: RatingTranslations;
  targetUserName: string;
  targetUserRole: 'DRIVER' | 'PASSENGER';
  targetUserAvatar?: string;
  categories: Array<{ key: string; label: string }>;
  ratings: Record<string, number>;
  onRatingChange: (categoryKey: string, rating: number) => void;
  reviewText: string;
  onReviewChange: (text: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}
