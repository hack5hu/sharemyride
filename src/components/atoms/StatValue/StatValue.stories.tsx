import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatValue } from './StatValue';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/StatValue',
  component: StatValue,

} satisfies Meta<typeof StatValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md"
  },
};
