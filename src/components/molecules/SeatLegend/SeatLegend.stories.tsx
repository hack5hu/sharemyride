import React from 'react';
import { View } from 'react-native';
import { SeatLegend } from './SeatLegend';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/SeatLegend',
  component: SeatLegend,
} satisfies Meta<typeof SeatLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for SeatLegend
  },
};
