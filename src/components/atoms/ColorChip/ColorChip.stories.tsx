import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorChip } from './ColorChip';
import { View } from 'react-native';

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
