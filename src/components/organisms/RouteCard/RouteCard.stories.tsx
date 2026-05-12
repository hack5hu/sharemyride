import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RouteCard } from './RouteCard';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/RouteCard',
  component: RouteCard,

} satisfies Meta<typeof RouteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPress: () => console.log("Pressed")
  },
};
