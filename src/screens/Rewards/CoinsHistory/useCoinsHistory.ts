import { useCallback, useMemo, useState } from 'react';
import { type TransactionFilter } from '@/components/templates/CoinsHistoryTemplate';
import { CoinTransactionType } from '@/constants/enums';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useRewardsStore } from '@/store/useRewardsStore';

export const useCoinsHistory = () => {
  const navigation = useAppNavigation();

  const coins = useRewardsStore(state => state.coins);
  const totalEarned = useRewardsStore(state => state.totalEarned);
  const transactions = useRewardsStore(state => state.transactions);

  const [activeFilter, setActiveFilter] = useState<TransactionFilter>('ALL');

  const totalSpent = useMemo(() => {
    return transactions
      .filter(tx => tx.type === CoinTransactionType.SPENT)
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (activeFilter === 'EARNED') {
      return transactions.filter(tx => tx.type === CoinTransactionType.EARNED);
    }
    if (activeFilter === 'SPENT') {
      return transactions.filter(tx => tx.type === CoinTransactionType.SPENT);
    }
    return transactions;
  }, [activeFilter, transactions]);

  const handleSelectFilter = useCallback((filter: TransactionFilter) => {
    setActiveFilter(filter);
  }, []);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    coins,
    totalEarned,
    totalSpent,
    transactions: filteredTransactions,
    activeFilter,
    handleSelectFilter,
    handleBack,
  };
};

