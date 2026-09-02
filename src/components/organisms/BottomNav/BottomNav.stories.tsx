import React from 'react';
import { View } from 'react-native';
import { BottomNav } from './BottomNav';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/BottomNav',
  component: BottomNav,
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'star',
  },
};
