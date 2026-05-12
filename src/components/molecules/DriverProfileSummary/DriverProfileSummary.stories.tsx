import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DriverProfileSummary } from './DriverProfileSummary';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/DriverProfileSummary',
  component: DriverProfileSummary,

} satisfies Meta<typeof DriverProfileSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rating: 4.5
  },
};
