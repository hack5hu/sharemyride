import React from 'react';
import { View } from 'react-native';
import { RideTimestampRow } from './RideTimestampRow';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/RideTimestampRow',
  component: RideTimestampRow,
} satisfies Meta<typeof RideTimestampRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for RideTimestampRow
  },
};
