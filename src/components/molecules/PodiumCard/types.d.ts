import { type LeaderboardUser } from '@/types/rewards';

export interface PodiumCardProps {
  topThree: LeaderboardUser[];
  onUserPress?: (user: LeaderboardUser) => void;
}
