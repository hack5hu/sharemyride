import { useCallback } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import {
  DEFAULT_REDEEMABLE_COUPONS,
  MOCK_TOP_DRIVERS,
  MOCK_TOP_RIDERS,
} from '@/constants/rewards';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/store/useAuthStore';
import { useRewardsStore } from '@/store/useRewardsStore';
import {
  type LeaderboardRole,
  type LeaderboardTab,
  type LeaderboardUser,
  type RedeemableCoupon,
} from '@/types/rewards';

export const useLeaderboard = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const coins = useRewardsStore(state => state.coins);
  const activeTab = useRewardsStore(state => state.activeTab);
  const activeRole = useRewardsStore(state => state.activeRole);
  const claimedCoupons = useRewardsStore(state => state.claimedCoupons);
  const isRulesModalVisible = useRewardsStore(state => state.isRulesModalVisible);
  const setActiveTab = useRewardsStore(state => state.setActiveTab);
  const setActiveRole = useRewardsStore(state => state.setActiveRole);
  const setRulesModalVisible = useRewardsStore(state => state.setRulesModalVisible);
  const redeemCoupon = useRewardsStore(state => state.redeemCoupon);

  const user = useAuthStore(state => state.user);

  const currentUser: LeaderboardUser = {
    id: user?.id ? String(user.id) : 'current_user',
    name: user?.name || t('rewards.you'),
    avatarUri: user?.profilePhotoUrl,
    rank: activeRole === 'driver' ? 7 : 6,
    ridesCount: activeRole === 'driver' ? 14 : 17,
    coinsEarned: coins,
    isCurrentUser: true,
  };

  const handleSelectTab = useCallback(
    (tab: LeaderboardTab) => {
      setActiveTab(tab);
    },
    [setActiveTab],
  );

  const handleSelectRole = useCallback(
    (role: LeaderboardRole) => {
      setActiveRole(role);
    },
    [setActiveRole],
  );

  const handleRedeemCoupon = useCallback(
    (coupon: RedeemableCoupon) => {
      const success = redeemCoupon(coupon);
      if (success) {
        showNotification(
          NotificationType.SUCCESS,
          t('rewards.claimedSuccessTitle'),
          t('rewards.claimedSuccessMsg', {
            title: coupon.title,
            code: coupon.code,
          }),
        );
        setActiveTab('coupons');
      } else {
        showNotification(
          NotificationType.ERROR,
          t('rewards.insufficientCoinsTitle'),
          t('rewards.insufficientCoinsMsg', { cost: coupon.coinCost }),
        );
      }
    },
    [redeemCoupon, setActiveTab, t],
  );

  const handleCopyCouponCode = useCallback(
    (code: string) => {
      Clipboard.setString(code);
      showNotification(
        NotificationType.SUCCESS,
        t('rewards.couponCopied'),
        code,
      );
    },
    [t],
  );

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleOpenRules = useCallback(() => {
    setRulesModalVisible(true);
  }, [setRulesModalVisible]);

  const handleCloseRules = useCallback(() => {
    setRulesModalVisible(false);
  }, [setRulesModalVisible]);

  return {
    coins,
    activeTab,
    activeRole,
    topDrivers: MOCK_TOP_DRIVERS,
    topRiders: MOCK_TOP_RIDERS,
    currentUser,
    redeemableCoupons: DEFAULT_REDEEMABLE_COUPONS,
    claimedCoupons,
    isRulesModalVisible,
    handleSelectTab,
    handleSelectRole,
    handleRedeemCoupon,
    handleCopyCouponCode,
    handleBack,
    handleOpenRules,
    handleCloseRules,
  };
};
