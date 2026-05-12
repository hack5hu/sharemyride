import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/Toast',
  component: Toast,

} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for Toast
  },
};
