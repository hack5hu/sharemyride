import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GenderSelector } from './GenderSelector';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/GenderSelector',
  component: GenderSelector,

} satisfies Meta<typeof GenderSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Sample Label"
  },
};
