import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,

} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for EmptyState
  },
};
