import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RideStatsStrip } from './RideStatsStrip';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/RideStatsStrip',
  component: RideStatsStrip,

} satisfies Meta<typeof RideStatsStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    t: {}
  },
};
