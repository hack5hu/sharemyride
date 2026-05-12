import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RideComfortSection } from './RideComfortSection';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/RideComfortSection',
  component: RideComfortSection,

} satisfies Meta<typeof RideComfortSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    features: [],
    t: {}
  },
};
