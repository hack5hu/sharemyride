import React from 'react';
import { View } from 'react-native';
import { Toggle } from './Toggle';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for Toggle
  },
};
