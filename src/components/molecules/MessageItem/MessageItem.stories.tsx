import React from 'react';
import { View } from 'react-native';
import { MessageItem } from './MessageItem';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/MessageItem',
  component: MessageItem,
} satisfies Meta<typeof MessageItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for MessageItem
  },
};
