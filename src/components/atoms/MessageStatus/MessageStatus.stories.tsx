import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MessageStatus } from './MessageStatus';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/MessageStatus',
  component: MessageStatus,

} satisfies Meta<typeof MessageStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for MessageStatus
  },
};
