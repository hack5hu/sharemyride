import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimeDial } from './TimeDial';
import { View } from 'react-native';

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
