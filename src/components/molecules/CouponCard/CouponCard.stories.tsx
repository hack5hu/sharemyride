import type { Meta, StoryObj } from '@storybook/react-native';
import { DEFAULT_REDEEMABLE_COUPONS } from '@/constants/rewards';
import { CouponCard } from './CouponCard';

const meta = {
  title: 'Molecules/CouponCard',
  component: CouponCard,
} satisfies Meta<typeof CouponCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Redeemable: Story = {
  args: {
    coupon: DEFAULT_REDEEMABLE_COUPONS[0],
    userCoins: 200,
  },
};

export const Claimed: Story = {
  args: {
    claimedCoupon: {
      id: 'claimed_1',
      couponId: 'c_50',
      code: 'ZYNC50',
      title: '₹50 OFF on Next Ride',
      discountAmount: 50,
      minRideFare: 150,
      claimedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 14 * 86400000).toISOString(),
      isUsed: false,
    },
  },
};
