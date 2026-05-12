import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/StatusBadge',
  component: StatusBadge,

} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for StatusBadge
  },
};
