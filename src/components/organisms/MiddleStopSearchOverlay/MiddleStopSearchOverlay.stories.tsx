import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MiddleStopSearchOverlay } from './MiddleStopSearchOverlay';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/MiddleStopSearchOverlay',
  component: MiddleStopSearchOverlay,

} satisfies Meta<typeof MiddleStopSearchOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for MiddleStopSearchOverlay
  },
};
