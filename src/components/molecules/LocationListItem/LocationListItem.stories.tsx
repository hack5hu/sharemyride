import React from 'react';
import { View } from 'react-native';
import { LocationListItem } from './LocationListItem';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/LocationListItem',
  component: LocationListItem,
} satisfies Meta<typeof LocationListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for LocationListItem
  },
};
