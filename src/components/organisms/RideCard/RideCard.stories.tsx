import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RideCard } from './RideCard';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/RideCard',
  component: RideCard,

} satisfies Meta<typeof RideCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPress: () => console.log("Pressed"),
    items: [],
    size: "md"
  },
};
