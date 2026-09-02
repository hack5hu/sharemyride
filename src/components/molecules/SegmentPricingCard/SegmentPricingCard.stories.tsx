import React from 'react';
import { View } from 'react-native';
import { SegmentPricingCard } from './SegmentPricingCard';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/SegmentPricingCard',
  component: SegmentPricingCard,
} satisfies Meta<typeof SegmentPricingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 450,
  },
};
