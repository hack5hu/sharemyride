import type { Meta, StoryObj } from '@storybook/react-native';
import { ActiveRideBanner } from './ActiveRideBanner';

const meta = {
  title: 'Molecules/ActiveRideBanner',
  component: ActiveRideBanner,
} satisfies Meta<typeof ActiveRideBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Your ride is about to start',
    subtitle: '5 mins away • 3.8 km',
    onPress: () => {},
  },
};
