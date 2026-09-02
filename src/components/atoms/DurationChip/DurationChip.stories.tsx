import React from 'react';
import { View } from 'react-native';
import { DurationChip } from './DurationChip';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/DurationChip',
  component: DurationChip,
} satisfies Meta<typeof DurationChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for DurationChip
  },
};
