import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MapControlsFABs } from './MapControlsFABs';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/MapControlsFABs',
  component: MapControlsFABs,

} satisfies Meta<typeof MapControlsFABs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for MapControlsFABs
  },
};
