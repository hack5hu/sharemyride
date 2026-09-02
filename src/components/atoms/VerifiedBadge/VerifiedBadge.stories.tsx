import React from 'react';
import { View } from 'react-native';
import { VerifiedBadge } from './VerifiedBadge';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/VerifiedBadge',
  component: VerifiedBadge,
} satisfies Meta<typeof VerifiedBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for VerifiedBadge
  },
};
