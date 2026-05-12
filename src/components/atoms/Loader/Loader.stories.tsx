import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/Loader',
  component: Loader,

} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Sample Message"
  },
};
