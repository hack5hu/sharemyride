import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LiveLocationToggle } from './LiveLocationToggle';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/LiveLocationToggle',
  component: LiveLocationToggle,

} satisfies Meta<typeof LiveLocationToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for LiveLocationToggle
  },
};
