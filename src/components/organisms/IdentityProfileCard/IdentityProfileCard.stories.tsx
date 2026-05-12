import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IdentityProfileCard } from './IdentityProfileCard';
import { View } from 'react-native';

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
