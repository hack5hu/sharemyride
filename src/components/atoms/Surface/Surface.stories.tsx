import React from 'react';
import { View } from 'react-native';
import { Surface } from './Surface';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/Surface',
  component: Surface,
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for Surface
  },
};
