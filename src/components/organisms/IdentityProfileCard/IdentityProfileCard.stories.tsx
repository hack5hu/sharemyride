import React from 'react';
import { View } from 'react-native';
import { IdentityProfileCard } from './IdentityProfileCard';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/IdentityProfileCard',
  component: IdentityProfileCard,
} satisfies Meta<typeof IdentityProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for IdentityProfileCard
  },
};
