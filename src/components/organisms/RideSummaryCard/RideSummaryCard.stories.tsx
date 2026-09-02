import React from 'react';
import { View } from 'react-native';
import { RideSummaryCard } from './RideSummaryCard';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/RideSummaryCard',
  component: RideSummaryCard,
} satisfies Meta<typeof RideSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for RideSummaryCard
  },
};
