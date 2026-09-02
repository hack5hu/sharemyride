import { type UserReview } from '@/screens/Common/UserProfileDetail/types';

export interface UserRatingsTemplateProps {
  userName: string;
  reviews: UserReview[];
  isLoading: boolean;
  onBack: () => void;
}
