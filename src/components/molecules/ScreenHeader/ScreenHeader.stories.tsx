import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScreenHeader } from './ScreenHeader';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/ScreenHeader',
  component: ScreenHeader,

} satisfies Meta<typeof ScreenHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sample Title"
  },
};
