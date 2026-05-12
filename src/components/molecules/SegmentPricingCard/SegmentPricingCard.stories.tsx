import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentPricingCard } from './SegmentPricingCard';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/SegmentPricingCard',
  component: SegmentPricingCard,

} satisfies Meta<typeof SegmentPricingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 450
  },
};
