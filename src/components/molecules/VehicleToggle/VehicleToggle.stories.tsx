import React from 'react';
import { View } from 'react-native';
import { VehicleToggle } from './VehicleToggle';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/VehicleToggle',
  component: VehicleToggle,
} satisfies Meta<typeof VehicleToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: () => {},
    type: 'default',
  },
};
