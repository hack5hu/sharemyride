import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/Input',
  component: Input,

} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for Input
  },
};
