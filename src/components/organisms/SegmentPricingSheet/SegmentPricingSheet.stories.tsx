import React from 'react';
import { View } from 'react-native';
import { SegmentPricingSheet } from './SegmentPricingSheet';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/SegmentPricingSheet',
  component: SegmentPricingSheet,
} satisfies Meta<typeof SegmentPricingSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for SegmentPricingSheet
  },
};
