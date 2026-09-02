import React from 'react';
import { View } from 'react-native';
import { Typography } from './Typography';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for Typography
  },
};
