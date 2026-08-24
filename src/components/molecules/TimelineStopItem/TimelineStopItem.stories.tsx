import type { Meta, StoryObj } from '@storybook/react-native';
import { TimelineStopItem } from './TimelineStopItem';

const meta = {
  title: 'Molecules/TimelineStopItem',
  component: TimelineStopItem,
} satisfies Meta<typeof TimelineStopItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      id: 'tl-1',
      title: "Sarah's Pickup",
      subtitle: '08:42 AM',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      isCompleted: true,
    },
    isLast: false,
  },
};

export const CurrentUser: Story = {
  args: {
    item: {
      id: 'tl-2',
      title: 'Your Pickup',
      subtitle: 'Expected 08:50 AM',
      isCurrentUser: true,
    },
    isLast: false,
  },
};
