import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MatchedRideBento } from './MatchedRideBento';
import { View } from 'react-native';

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
