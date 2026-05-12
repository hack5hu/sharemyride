import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { View } from 'react-native';

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
