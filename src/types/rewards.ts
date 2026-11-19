import { type CoinTransactionType } from '@/constants/enums';

export interface LeaderboardUser {
  id: string;
  name: string;
  avatarUri?: string;
  rank: number;
  ridesCount: number;
  coinsEarned: number;
  rating?: number;
  rewardTitle?: string;
  isCurrentUser?: boolean;
}

export interface RedeemableCoupon {
  id: string;
  title: string;
  description: string;
  discountAmount: number;
  coinCost: number;
  code: string;
  minRideFare: number;
  validityDays: number;
  category: 'RIDE' | 'MEGA' | 'FEE';
}

export interface ClaimedCoupon {
  id: string;
  couponId: string;
  code: string;
  title: string;
  discountAmount: number;
  minRideFare: number;
  claimedAt: string;
  expiresAt: string;
  isUsed: boolean;
}

export interface CoinTransaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  type: CoinTransactionType;
  date: string;
  iconName?: string;
}

export type LeaderboardRole = 'driver' | 'rider';
export type LeaderboardTab = 'leaderboard' | 'redeem' | 'coupons';
