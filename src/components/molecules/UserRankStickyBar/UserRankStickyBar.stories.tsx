import type { Meta, StoryObj } from '@storybook/react-native';
import { UserRankStickyBar } from './UserRankStickyBar';

const meta = {
  title: 'Molecules/UserRankStickyBar',
  component: UserRankStickyBar,
} satisfies Meta<typeof UserRankStickyBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentUser: {
      id: 'current_user',
      name: 'Priyanshu Kumar',
      rank: 7,
      ridesCount: 14,
      coinsEarned: 200,
      isCurrentUser: true,
    },
  },
};

export const InTopThree: Story = {
  args: {
    currentUser: {
      id: 'current_user',
      name: 'Priyanshu Kumar',
      rank: 2,
      ridesCount: 31,
      coinsEarned: 1550,
      isCurrentUser: true,
    },
  },
};
