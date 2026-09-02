import React from 'react';
import { View } from 'react-native';
import { RideStatsStrip } from './RideStatsStrip';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/RideStatsStrip',
  component: RideStatsStrip,
} satisfies Meta<typeof RideStatsStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    t: {},
  },
};
