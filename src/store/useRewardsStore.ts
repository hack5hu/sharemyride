import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CoinTransactionType } from '@/constants/enums';
import { DEFAULT_COIN_TRANSACTIONS } from '@/constants/rewards';
import {
  type ClaimedCoupon,
  type CoinTransaction,
  type LeaderboardRole,
  type LeaderboardTab,
  type RedeemableCoupon,
} from '@/types/rewards';
import { mmkvStorage } from '@/utils/storage';
import { useAuthStore } from './useAuthStore';

interface RewardsState {
  coins: number;
  referralCode: string;
  totalEarned: number;
  referralsCount: number;
  isRulesModalVisible: boolean;
  claimedCoupons: ClaimedCoupon[];
  transactions: CoinTransaction[];
  activeRole: LeaderboardRole;
  activeTab: LeaderboardTab;
  setCoins: (coins: number) => void;
  setReferralCode: (code: string) => void;
  setRulesModalVisible: (visible: boolean) => void;
  setActiveRole: (role: LeaderboardRole) => void;
  setActiveTab: (tab: LeaderboardTab) => void;
  addCoins: (amount: number, reason?: string) => void;
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
      transactions: DEFAULT_COIN_TRANSACTIONS,
      activeRole: 'driver',
      activeTab: 'leaderboard',

      setCoins: coins => set({ coins }),
      setReferralCode: referralCode => set({ referralCode }),
      setRulesModalVisible: isRulesModalVisible => set({ isRulesModalVisible }),
      setActiveRole: activeRole => set({ activeRole }),
      setActiveTab: activeTab => set({ activeTab }),

      addCoins: (amount, reason) => {
        const newTx: CoinTransaction = {
          id: `tx_${Date.now()}`,
          title: reason || 'Earned Coins',
          description: 'Bonus credited to wallet',
          amount,
          type: CoinTransactionType.EARNED,
          date: 'Just now',
          iconName: 'toll',
        };
        set(state => ({
          coins: state.coins + amount,
          totalEarned: state.totalEarned + amount,
          transactions: [newTx, ...state.transactions],
        }));
      },

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

        const newTx: CoinTransaction = {
          id: `tx_${Date.now()}`,
          title: coupon.title,
          description: `Voucher Code: ${coupon.code}`,
          amount: coupon.coinCost,
          type: CoinTransactionType.SPENT,
          date: 'Just now',
          iconName: 'local-offer',
        };

        set(state => ({
          coins: state.coins - coupon.coinCost,
          claimedCoupons: [newClaimedCoupon, ...state.claimedCoupons],
          transactions: [newTx, ...state.transactions],
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
        transactions: state.transactions,
      }),
    },
  ),
);
