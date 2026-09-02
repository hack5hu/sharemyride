import React from 'react';
import { View } from 'react-native';
import { Chip } from './Chip';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for Chip
  },
};
