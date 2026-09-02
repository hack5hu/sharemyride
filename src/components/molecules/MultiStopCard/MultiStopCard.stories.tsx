import React from 'react';
import { View } from 'react-native';
import { MultiStopCard } from './MultiStopCard';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/MultiStopCard',
  component: MultiStopCard,
} satisfies Meta<typeof MultiStopCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
    subtitle: 'Sample Subtitle',
  },
};
