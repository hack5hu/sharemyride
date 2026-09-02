import React from 'react';
import { View } from 'react-native';
import { AvatarPicker } from './AvatarPicker';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/AvatarPicker',
  component: AvatarPicker,
} satisfies Meta<typeof AvatarPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'User Name',
    type: 'default',
  },
};
