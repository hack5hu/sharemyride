import React from 'react';
import { View } from 'react-native';
import { RiderCard } from './RiderCard';
import type { Meta, StoryObj } from '@storybook/react-native';

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
