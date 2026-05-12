import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StopItem } from './StopItem';
import { View } from 'react-native';

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
