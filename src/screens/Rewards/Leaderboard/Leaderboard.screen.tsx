import React, { memo } from 'react';
import { CoinRulesModal } from '@/components/molecules/CoinRulesModal';
import { LeaderboardTemplate } from '@/components/templates/LeaderboardTemplate';
import { useLeaderboard } from './useLeaderboard';

export const LeaderboardScreen: React.FC = memo(() => {
  const {
    coins,
    activeTab,
    activeRole,
    topDrivers,
    topRiders,
    currentUser,
    redeemableCoupons,
    claimedCoupons,
    isRulesModalVisible,
    handleSelectTab,
    handleSelectRole,
    handleRedeemCoupon,
    handleCopyCouponCode,
    handleBack,
    handleOpenRules,
    handleCloseRules,
  } = useLeaderboard();

  return (
    <>
      <LeaderboardTemplate
        coins={coins}
        activeTab={activeTab}
        activeRole={activeRole}
        topDrivers={topDrivers}
        topRiders={topRiders}
        currentUser={currentUser}
        redeemableCoupons={redeemableCoupons}
        claimedCoupons={claimedCoupons}
        onSelectTab={handleSelectTab}
        onSelectRole={handleSelectRole}
        onRedeemCoupon={handleRedeemCoupon}
        onCopyCouponCode={handleCopyCouponCode}
        onBack={handleBack}
        onOpenRules={handleOpenRules}
      />

      <CoinRulesModal
        isVisible={isRulesModalVisible}
        onClose={handleCloseRules}
      />
    </>
  );
});

LeaderboardScreen.displayName = 'LeaderboardScreen';
