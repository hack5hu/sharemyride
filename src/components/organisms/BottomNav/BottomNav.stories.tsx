import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomNav } from './BottomNav';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/BottomNav',
  component: BottomNav,

} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "star"
  },
};
