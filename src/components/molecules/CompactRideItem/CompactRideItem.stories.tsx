import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CompactRideItem } from './CompactRideItem';
import { View } from 'react-native';

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
