import { type ClaimedCoupon, type RedeemableCoupon } from '@/types/rewards';

export interface CouponCardProps {
  coupon?: RedeemableCoupon;
  claimedCoupon?: ClaimedCoupon;
  userCoins?: number;
  onRedeem?: (coupon: RedeemableCoupon) => void;
  onCopyCode?: (code: string) => void;
}
