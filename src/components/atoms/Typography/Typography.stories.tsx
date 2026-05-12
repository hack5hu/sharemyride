import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';
import { View } from 'react-native';

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
