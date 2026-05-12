import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RideVehicleCard } from './RideVehicleCard';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/RideVehicleCard',
  component: RideVehicleCard,

} satisfies Meta<typeof RideVehicleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "default"
  },
};
