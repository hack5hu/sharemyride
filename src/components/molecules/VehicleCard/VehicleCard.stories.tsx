import React from 'react';
import { View } from 'react-native';
import { VehicleCard } from './VehicleCard';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/VehicleCard',
  component: VehicleCard,
} satisfies Meta<typeof VehicleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPress: () => console.log('Pressed'),
    type: 'default',
  },
};
