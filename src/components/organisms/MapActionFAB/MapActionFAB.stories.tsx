import React from 'react';
import { View } from 'react-native';
import { MapActionFAB } from './MapActionFAB';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/MapActionFAB',
  component: MapActionFAB,
} satisfies Meta<typeof MapActionFAB>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for MapActionFAB
  },
};
