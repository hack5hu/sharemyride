import React from 'react';
import { View } from 'react-native';
import { ChatAppHeader } from './ChatAppHeader';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/ChatAppHeader',
  component: ChatAppHeader,
} satisfies Meta<typeof ChatAppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for ChatAppHeader
  },
};
