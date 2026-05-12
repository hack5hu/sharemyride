import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VehicleTypeCard } from './VehicleTypeCard';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/VehicleTypeCard',
  component: VehicleTypeCard,

} satisfies Meta<typeof VehicleTypeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for VehicleTypeCard
  },
};
