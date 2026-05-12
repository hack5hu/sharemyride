import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RideTimestampRow } from './RideTimestampRow';
import { View } from 'react-native';

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
