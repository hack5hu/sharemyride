import React from 'react';
import { View } from 'react-native';
import { ScreenHeader } from './ScreenHeader';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/ScreenHeader',
  component: ScreenHeader,
} satisfies Meta<typeof ScreenHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
  },
};
