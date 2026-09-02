import React from 'react';
import { View } from 'react-native';
import { IconButton } from './IconButton';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for IconButton
  },
};
