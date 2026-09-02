import React from 'react';
import { View } from 'react-native';
import { StatValue } from './StatValue';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/StatValue',
  component: StatValue,
} satisfies Meta<typeof StatValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};
