import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CommonHeader } from './CommonHeader';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/CommonHeader',
  component: CommonHeader,

} satisfies Meta<typeof CommonHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sample Title"
  },
};
