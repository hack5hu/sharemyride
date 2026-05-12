import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MapPin } from './MapPin';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/MapPin',
  component: MapPin,

} satisfies Meta<typeof MapPin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for MapPin
  },
};
