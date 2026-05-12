import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RouteIndicator } from './RouteIndicator';
import { View } from 'react-native';

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
