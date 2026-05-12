import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RiderCard } from './RiderCard';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/RiderCard',
  component: RiderCard,

} satisfies Meta<typeof RiderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for RiderCard
  },
};
