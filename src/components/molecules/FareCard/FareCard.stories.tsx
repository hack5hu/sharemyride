import React from 'react';
import { View } from 'react-native';
import { FareCard } from './FareCard';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/FareCard',
  component: FareCard,
} satisfies Meta<typeof FareCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for FareCard
  },
};
