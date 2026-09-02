import React from 'react';
import { View } from 'react-native';
import { CarFloorPlan } from './CarFloorPlan';
import type { Meta, StoryObj } from '@storybook/react-native';

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
