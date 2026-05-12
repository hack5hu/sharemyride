import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MessageBubble } from './MessageBubble';
import { View } from 'react-native';

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
