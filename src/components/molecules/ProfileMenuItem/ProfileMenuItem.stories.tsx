import React from 'react';
import { View } from 'react-native';
import { ProfileMenuItem } from './ProfileMenuItem';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/ProfileMenuItem',
  component: ProfileMenuItem,
} satisfies Meta<typeof ProfileMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPress: () => console.log('Pressed'),
    title: 'Sample Title',
    subtitle: 'Sample Subtitle',
    icon: 'star',
  },
};

export const WithBadge: Story = {
  args: {
    onPress: () => console.log('Pressed'),
    title: 'Leaderboard & Rewards',
    subtitle: 'Top 3 win prizes',
    icon: 'emoji-events',
    iconBgColor: '#FEF3C7',
    iconColor: '#D97706',
  },
};
