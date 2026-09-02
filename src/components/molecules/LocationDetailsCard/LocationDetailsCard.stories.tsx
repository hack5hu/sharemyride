import React from 'react';
import { View } from 'react-native';
import { LocationDetailsCard } from './LocationDetailsCard';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/LocationDetailsCard',
  component: LocationDetailsCard,
} satisfies Meta<typeof LocationDetailsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: () => {},
  },
};
