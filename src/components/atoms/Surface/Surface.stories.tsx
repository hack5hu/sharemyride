import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Surface } from './Surface';
import { View } from 'react-native';

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
