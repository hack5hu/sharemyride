import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SafetyTrustCard } from './SafetyTrustCard';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/SafetyTrustCard',
  component: SafetyTrustCard,

} satisfies Meta<typeof SafetyTrustCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for SafetyTrustCard
  },
};
