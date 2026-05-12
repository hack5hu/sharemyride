import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,

} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for IconButton
  },
};
