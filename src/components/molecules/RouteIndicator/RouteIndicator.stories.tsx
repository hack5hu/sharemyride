import React from 'react';
import { View } from 'react-native';
import { RouteIndicator } from './RouteIndicator';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/RouteIndicator',
  component: RouteIndicator,
} satisfies Meta<typeof RouteIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for RouteIndicator
  },
};
