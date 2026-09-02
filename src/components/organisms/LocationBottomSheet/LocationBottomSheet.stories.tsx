import React from 'react';
import { View } from 'react-native';
import { LocationBottomSheet } from './LocationBottomSheet';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/LocationBottomSheet',
  component: LocationBottomSheet,
} satisfies Meta<typeof LocationBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
    icon: 'star',
  },
};
