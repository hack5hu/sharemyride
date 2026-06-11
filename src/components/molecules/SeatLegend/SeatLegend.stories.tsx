import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SeatLegend } from './SeatLegend';
import { View } from 'react-native';

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
