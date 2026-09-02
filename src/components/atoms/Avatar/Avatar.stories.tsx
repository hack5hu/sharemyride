import React from 'react';
import { View } from 'react-native';
import { Avatar } from './Avatar';
import type { Meta, StoryObj } from '@storybook/react-native';

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
