import React from 'react';
import { View } from 'react-native';
import { StopItem } from './StopItem';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/StopItem',
  component: StopItem,
} satisfies Meta<typeof StopItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for StopItem
  },
};
