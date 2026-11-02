import { type LeaderboardUser } from '@/types/rewards';

export interface LeaderboardRowProps {
  user: LeaderboardUser;
  onPress?: (user: LeaderboardUser) => void;
}
