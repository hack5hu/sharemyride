import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InfoBar } from './InfoBar';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/InfoBar',
  component: InfoBar,

} satisfies Meta<typeof InfoBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "star"
  },
};
