import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VehicleHorizontalList } from './VehicleHorizontalList';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/VehicleHorizontalList',
  component: VehicleHorizontalList,

} satisfies Meta<typeof VehicleHorizontalList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: () => {},
    title: "Sample Title",
    vehicles: []
  },
};
