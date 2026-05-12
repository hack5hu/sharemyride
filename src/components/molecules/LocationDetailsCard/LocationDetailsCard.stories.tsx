import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LocationDetailsCard } from './LocationDetailsCard';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/LocationDetailsCard',
  component: LocationDetailsCard,

} satisfies Meta<typeof LocationDetailsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: () => {}
  },
};
