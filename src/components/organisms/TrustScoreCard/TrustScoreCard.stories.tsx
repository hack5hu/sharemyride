import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TrustScoreCard } from './TrustScoreCard';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/TrustScoreCard',
  component: TrustScoreCard,

} satisfies Meta<typeof TrustScoreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for TrustScoreCard
  },
};
