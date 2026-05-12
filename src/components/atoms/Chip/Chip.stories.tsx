import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { View } from 'react-native';

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
