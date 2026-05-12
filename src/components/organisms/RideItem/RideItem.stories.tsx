import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RideItem } from './RideItem';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/RideItem',
  component: RideItem,

} satisfies Meta<typeof RideItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeTab: "upcoming"
  },
};
