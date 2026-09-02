import React from 'react';
import { View } from 'react-native';
import { MapContextOverlay } from './MapContextOverlay';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/MapContextOverlay',
  component: MapContextOverlay,
} satisfies Meta<typeof MapContextOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for MapContextOverlay
  },
};
