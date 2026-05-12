import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UpcomingRideCard } from './UpcomingRideCard';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/UpcomingRideCard',
  component: UpcomingRideCard,

} satisfies Meta<typeof UpcomingRideCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for UpcomingRideCard
  },
};
