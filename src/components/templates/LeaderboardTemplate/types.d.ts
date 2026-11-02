import {
  type ClaimedCoupon,
  type LeaderboardRole,
  type LeaderboardTab,
  type LeaderboardUser,
  type RedeemableCoupon,
} from '@/types/rewards';

export interface LeaderboardTemplateProps {
  coins: number;
  activeTab: LeaderboardTab;
  activeRole: LeaderboardRole;
  topDrivers: LeaderboardUser[];
  topRiders: LeaderboardUser[];
  currentUser: LeaderboardUser;
  redeemableCoupons: RedeemableCoupon[];
  claimedCoupons: ClaimedCoupon[];
  onSelectTab: (tab: LeaderboardTab) => void;
  onSelectRole: (role: LeaderboardRole) => void;
  onRedeemCoupon: (coupon: RedeemableCoupon) => void;
  onCopyCouponCode: (code: string) => void;
  onBack: () => void;
  onOpenRules: () => void;
}
