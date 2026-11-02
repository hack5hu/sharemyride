import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type ClaimedCoupon, type LeaderboardRole, type LeaderboardTab, type RedeemableCoupon } from '@/types/rewards';
import { mmkvStorage } from '@/utils/storage';
import { useAuthStore } from './useAuthStore';

interface RewardsState {
  coins: number;
  referralCode: string;
  totalEarned: number;
  referralsCount: number;
  isRulesModalVisible: boolean;
  claimedCoupons: ClaimedCoupon[];
  activeRole: LeaderboardRole;
  activeTab: LeaderboardTab;
  setCoins: (coins: number) => void;
  setReferralCode: (code: string) => void;
  setRulesModalVisible: (visible: boolean) => void;
  setActiveRole: (role: LeaderboardRole) => void;
  setActiveTab: (tab: LeaderboardTab) => void;
  addCoins: (amount: number) => void;
  redeemCoupon: (coupon: RedeemableCoupon) => boolean;
  getReferralCode: () => string;
}

export const useRewardsStore = create<RewardsState>()(
  persist(
    (set, get) => ({
      coins: 200,
      referralCode: '',
      totalEarned: 200,
      referralsCount: 0,
      isRulesModalVisible: false,
      claimedCoupons: [],
      activeRole: 'driver',
      activeTab: 'leaderboard',

      setCoins: coins => set({ coins }),
      setReferralCode: referralCode => set({ referralCode }),
      setRulesModalVisible: isRulesModalVisible => set({ isRulesModalVisible }),
      setActiveRole: activeRole => set({ activeRole }),
      setActiveTab: activeTab => set({ activeTab }),

      addCoins: amount =>
        set(state => ({
          coins: state.coins + amount,
          totalEarned: state.totalEarned + amount,
        })),

      redeemCoupon: coupon => {
        const currentCoins = get().coins;
        if (currentCoins < coupon.coinCost) {
          return false;
        }

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + coupon.validityDays);

        const newClaimedCoupon: ClaimedCoupon = {
          id: `claimed_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          couponId: coupon.id,
          code: coupon.code,
          title: coupon.title,
          discountAmount: coupon.discountAmount,
          minRideFare: coupon.minRideFare,
          claimedAt: new Date().toISOString(),
          expiresAt: expiresAt.toISOString(),
          isUsed: false,
        };

        set(state => ({
          coins: state.coins - coupon.coinCost,
          claimedCoupons: [newClaimedCoupon, ...state.claimedCoupons],
        }));

        return true;
      },

      getReferralCode: () => {
        const currentCode = get().referralCode;
        if (currentCode) return currentCode;

        const user = useAuthStore.getState().user;
        let suffix = '200';
        if (user?.name) {
          const cleanName = user.name.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4);
          suffix = cleanName || 'RIDE';
        } else if (user?.phone || user?.phoneNumber) {
          const phone = String(user.phone || user.phoneNumber).slice(-4);
          suffix = phone || '200';
        }
        const generated = `ZYNC${suffix}`;
        set({ referralCode: generated });
        return generated;
      },
    }),
    {
      name: 'rewards-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: state => ({
        coins: state.coins,
        referralCode: state.referralCode,
        totalEarned: state.totalEarned,
        referralsCount: state.referralsCount,
        claimedCoupons: state.claimedCoupons,
      }),
    },
  ),
);
