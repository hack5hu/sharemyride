import React, { memo } from 'react';
import { ReferAndEarnTemplate } from '@/components/templates/ReferAndEarnTemplate';
import { useReferAndEarn } from './useReferAndEarn';

export const ReferAndEarnScreen: React.FC = memo(() => {
  const {
    coins,
    referralCode,
    isRulesModalVisible,
    handleBackPress,
    handleCopyCode,
    handleShareWhatsApp,
    handleShareOther,
    handleOpenRulesModal,
    handleCloseRulesModal,
  } = useReferAndEarn();

  return (
    <ReferAndEarnTemplate
      coins={coins}
      referralCode={referralCode}
      isRulesModalVisible={isRulesModalVisible}
      onBackPress={handleBackPress}
      onCopyCode={handleCopyCode}
      onShareWhatsApp={handleShareWhatsApp}
      onShareOther={handleShareOther}
      onOpenRulesModal={handleOpenRulesModal}
      onCloseRulesModal={handleCloseRulesModal}
    />
  );
});

ReferAndEarnScreen.displayName = 'ReferAndEarnScreen';
