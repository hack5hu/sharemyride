import type { Meta, StoryObj } from '@storybook/react-native';
import { CoinBadge } from './CoinBadge';

const meta = {
  title: 'Atoms/CoinBadge',
  component: CoinBadge,
} satisfies Meta<typeof CoinBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    coins: 200,
    variant: 'header',
    showHelpIcon: true,
  },
};

export const Compact: Story = {
  args: {
    coins: 50,
    variant: 'compact',
    showHelpIcon: false,
  },
};
