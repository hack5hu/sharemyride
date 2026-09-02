import React from 'react';
import { View } from 'react-native';
import { InfoBar } from './InfoBar';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/InfoBar',
  component: InfoBar,
} satisfies Meta<typeof InfoBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'star',
  },
};
