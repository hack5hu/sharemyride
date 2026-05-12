import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,

} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for Avatar
  },
};
