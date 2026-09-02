import React from 'react';
import { View } from 'react-native';
import { SeatSummaryBar } from './SeatSummaryBar';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/SeatSummaryBar',
  component: SeatSummaryBar,
} satisfies Meta<typeof SeatSummaryBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for SeatSummaryBar
  },
};
