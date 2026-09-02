import React from 'react';
import { View } from 'react-native';
import { RideComfortSection } from './RideComfortSection';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/RideComfortSection',
  component: RideComfortSection,
} satisfies Meta<typeof RideComfortSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    features: [],
    t: {},
  },
};
