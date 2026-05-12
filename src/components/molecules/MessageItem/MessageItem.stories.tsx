import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MessageItem } from './MessageItem';
import { View } from 'react-native';

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
