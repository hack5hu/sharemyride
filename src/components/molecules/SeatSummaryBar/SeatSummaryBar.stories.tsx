import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SeatSummaryBar } from './SeatSummaryBar';
import { View } from 'react-native';

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
