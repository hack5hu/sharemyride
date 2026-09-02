import React from 'react';
import { View } from 'react-native';
import { Loader } from './Loader';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/Loader',
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Sample Message',
  },
};
