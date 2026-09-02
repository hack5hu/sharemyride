import React from 'react';
import { View } from 'react-native';
import { Handlebar } from './Handlebar';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/Handlebar',
  component: Handlebar,
} satisfies Meta<typeof Handlebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for Handlebar
  },
};
