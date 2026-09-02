import React from 'react';
import { View } from 'react-native';
import { RideItem } from './RideItem';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/RideItem',
  component: RideItem,
} satisfies Meta<typeof RideItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeTab: 'upcoming',
  },
};
