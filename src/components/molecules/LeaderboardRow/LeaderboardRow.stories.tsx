import type { Meta, StoryObj } from '@storybook/react-native';
import { MOCK_TOP_DRIVERS } from '@/constants/rewards';
import { LeaderboardRow } from './LeaderboardRow';

const meta = {
  title: 'Molecules/LeaderboardRow',
  component: LeaderboardRow,
} satisfies Meta<typeof LeaderboardRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: MOCK_TOP_DRIVERS[3],
  },
};

export const CurrentUser: Story = {
  args: {
    user: {
      ...MOCK_TOP_DRIVERS[4],
      isCurrentUser: true,
    },
  },
};
