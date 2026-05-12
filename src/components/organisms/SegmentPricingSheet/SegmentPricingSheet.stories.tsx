import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentPricingSheet } from './SegmentPricingSheet';
import { View } from 'react-native';

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
