import React from 'react';
import { View } from 'react-native';
import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for Button
  },
};
