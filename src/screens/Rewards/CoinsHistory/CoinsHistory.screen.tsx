import React, { memo } from 'react';
import { CoinsHistoryTemplate } from '@/components/templates/CoinsHistoryTemplate';
import { useCoinsHistory } from './useCoinsHistory';

export const CoinsHistoryScreen: React.FC = memo(() => {
  const {
    coins,
    totalEarned,
    totalSpent,
    transactions,
    activeFilter,
    handleSelectFilter,
    handleBack,
  } = useCoinsHistory();

  return (
    <CoinsHistoryTemplate
      coins={coins}
      totalEarned={totalEarned}
      totalSpent={totalSpent}
      transactions={transactions}
      activeFilter={activeFilter}
      onSelectFilter={handleSelectFilter}
      onBack={handleBack}
    />
  );
});

CoinsHistoryScreen.displayName = 'CoinsHistoryScreen';

