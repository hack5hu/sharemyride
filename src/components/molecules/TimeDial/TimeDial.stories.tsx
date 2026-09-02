import React from 'react';
import { View } from 'react-native';
import { TimeDial } from './TimeDial';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/TimeDial',
  component: TimeDial,
} satisfies Meta<typeof TimeDial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for TimeDial
  },
};
