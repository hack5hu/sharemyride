import type { Meta, StoryObj } from '@storybook/react-native';
import { CoinTransactionType } from '@/constants/enums';
import { CoinTransactionItem } from './CoinTransactionItem';

const meta = {
  title: 'Molecules/CoinTransactionItem',
  component: CoinTransactionItem,
} satisfies Meta<typeof CoinTransactionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Earned: Story = {
  args: {
    transaction: {
      id: 'tx_earned',
      title: 'Referral Bonus',
      description: 'Rahul completed first ride',
      amount: 200,
      type: CoinTransactionType.EARNED,
      date: 'Yesterday, 4:30 PM',
      iconName: 'group-add',
    },
  },
};

export const Spent: Story = {
  args: {
    transaction: {
      id: 'tx_spent',
      title: '₹50 OFF on Next Ride',
      description: 'Voucher Code: ZYNC50',
      amount: 100,
      type: CoinTransactionType.SPENT,
      date: 'Today, 2:15 PM',
      iconName: 'local-offer',
    },
  },
};

