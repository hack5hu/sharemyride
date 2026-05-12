import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RideTimeline } from './RideTimeline';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/RideTimeline',
  component: RideTimeline,

} satisfies Meta<typeof RideTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [],
    points: [],
    type: "default",
    size: "md"
  },
};
