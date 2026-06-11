import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassSearchBar } from './GlassSearchBar';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/GlassSearchBar',
  component: GlassSearchBar,

} satisfies Meta<typeof GlassSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for GlassSearchBar
  },
};
