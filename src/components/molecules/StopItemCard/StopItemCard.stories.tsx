import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { StopItemCard } from './StopItemCard';
import { DriverStopStatus } from './types';

const meta = {
  title: 'Molecules/StopItemCard',
  component: StopItemCard,
} satisfies Meta<typeof StopItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stop: {
      id: '1',
      userId: 'user_1',
      passengerName: 'Jane Doe',
      passengerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      pickupLocation: 'Main St, 123',
      distanceAway: '2 km away',
      status: DriverStopStatus.ACTIVE,
    },
    isLast: false,
    subtitle: 'Pickup: Main St, 123',
    chatAccessibilityLabel: 'Chat with Jane Doe',
    callAccessibilityLabel: 'Call Jane Doe',
    onChatPress: () => {},
    onCallPress: () => {},
  },
};
