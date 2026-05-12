import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AvatarPicker } from './AvatarPicker';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/AvatarPicker',
  component: AvatarPicker,

} satisfies Meta<typeof AvatarPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "User Name",
    type: "default"
  },
};
