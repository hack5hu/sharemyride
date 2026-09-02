import React from 'react';
import { View } from 'react-native';
import { Badge } from './Badge';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Sample Label',
    variant: 'primary',
  },
};
