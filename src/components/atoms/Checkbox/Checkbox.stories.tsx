import React from 'react';
import { View } from 'react-native';
import { Checkbox } from './Checkbox';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for Checkbox
  },
};
