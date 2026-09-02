import React from 'react';
import { View } from 'react-native';
import { GlassSearchBar } from './GlassSearchBar';
import type { Meta, StoryObj } from '@storybook/react-native';

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
