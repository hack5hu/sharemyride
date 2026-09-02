import React from 'react';
import { View } from 'react-native';
import { StatItem } from './StatItem';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/StatItem',
  component: StatItem,
} satisfies Meta<typeof StatItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Sample Label',
  },
};
