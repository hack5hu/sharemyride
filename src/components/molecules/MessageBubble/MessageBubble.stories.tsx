import React from 'react';
import { View } from 'react-native';
import { MessageBubble } from './MessageBubble';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/MessageBubble',
  component: MessageBubble,
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for MessageBubble
  },
};
