import React from 'react';
import { View } from 'react-native';
import { CompactRideItem } from './CompactRideItem';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/CompactRideItem',
  component: CompactRideItem,
} satisfies Meta<typeof CompactRideItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for CompactRideItem
  },
};
