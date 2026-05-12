import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VehicleCard } from './VehicleCard';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/VehicleCard',
  component: VehicleCard,

} satisfies Meta<typeof VehicleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPress: () => console.log("Pressed"),
    type: "default"
  },
};
