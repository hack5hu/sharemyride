import React from 'react';
import { View } from 'react-native';
import { Box } from './Box';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/Box',
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [],
  },
};
