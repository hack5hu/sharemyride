import { type LeaderboardUser } from '@/types/rewards';

export interface UserRankStickyBarProps {
  currentUser: LeaderboardUser;
  onPress?: () => void;
}
