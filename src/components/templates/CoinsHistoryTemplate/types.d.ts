import { type CoinTransaction } from '@/types/rewards';

export type TransactionFilter = 'ALL' | 'EARNED' | 'SPENT';

export interface CoinsHistoryTemplateProps {
  coins: number;
  totalEarned: number;
  totalSpent: number;
  transactions: CoinTransaction[];
  activeFilter: TransactionFilter;
  onSelectFilter: (filter: TransactionFilter) => void;
  onBack: () => void;
}

