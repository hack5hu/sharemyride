import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VehicleToggle } from './VehicleToggle';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/VehicleToggle',
  component: VehicleToggle,

} satisfies Meta<typeof VehicleToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: () => {},
    type: "default"
  },
};
