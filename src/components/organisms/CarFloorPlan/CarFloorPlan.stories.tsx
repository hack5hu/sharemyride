import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CarFloorPlan } from './CarFloorPlan';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/CarFloorPlan',
  component: CarFloorPlan,

} satisfies Meta<typeof CarFloorPlan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for CarFloorPlan
  },
};
