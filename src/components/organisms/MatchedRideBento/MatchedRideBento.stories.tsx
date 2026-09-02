import React from 'react';
import { View } from 'react-native';
import { MatchedRideBento } from './MatchedRideBento';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/MatchedRideBento',
  component: MatchedRideBento,
} satisfies Meta<typeof MatchedRideBento>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for MatchedRideBento
  },
};
