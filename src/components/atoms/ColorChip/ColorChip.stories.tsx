import React from 'react';
import { View } from 'react-native';
import { ColorChip } from './ColorChip';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/ColorChip',
  component: ColorChip,
} satisfies Meta<typeof ColorChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for ColorChip
  },
};
