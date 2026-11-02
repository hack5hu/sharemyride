import type { Meta, StoryObj } from '@storybook/react-native';
import { MOCK_TOP_DRIVERS } from '@/constants/rewards';
import { PodiumCard } from './PodiumCard';

const meta = {
  title: 'Molecules/PodiumCard',
  component: PodiumCard,
} satisfies Meta<typeof PodiumCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    topThree: MOCK_TOP_DRIVERS.slice(0, 3),
  },
};
