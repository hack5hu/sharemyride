import React from 'react';
import { View } from 'react-native';
import { MapSearchOverlay } from './MapSearchOverlay';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/MapSearchOverlay',
  component: MapSearchOverlay,
} satisfies Meta<typeof MapSearchOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for MapSearchOverlay
  },
};
