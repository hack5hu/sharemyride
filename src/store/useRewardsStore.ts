import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';
import { useAuthStore } from './useAuthStore';

interface RewardsState {
  coins: number;
  referralCode: string;
  totalEarned: number;
  referralsCount: number;
  isRulesModalVisible: boolean;
  setCoins: (coins: number) => void;
  setReferralCode: (code: string) => void;
  setRulesModalVisible: (visible: boolean) => void;
  addCoins: (amount: number) => void;
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

      setCoins: coins => set({ coins }),

      setReferralCode: referralCode => set({ referralCode }),

      setRulesModalVisible: isRulesModalVisible => set({ isRulesModalVisible }),

      addCoins: amount =>
        set(state => ({
          coins: state.coins + amount,
          totalEarned: state.totalEarned + amount,
        })),

      getReferralCode: () => {
        const currentCode = get().referralCode;
        if (currentCode) return currentCode;

        // Generate deterministic or user-based referral code
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
      }),
    },
  ),
);
