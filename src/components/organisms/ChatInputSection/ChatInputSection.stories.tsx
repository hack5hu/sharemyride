import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatInputSection } from './ChatInputSection';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/ChatInputSection',
  component: ChatInputSection,

} satisfies Meta<typeof ChatInputSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for ChatInputSection
  },
};
