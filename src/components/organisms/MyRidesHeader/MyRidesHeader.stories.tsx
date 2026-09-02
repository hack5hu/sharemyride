import React from 'react';
import { View } from 'react-native';
import { MyRidesHeader } from './MyRidesHeader';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/MyRidesHeader',
  component: MyRidesHeader,
} satisfies Meta<typeof MyRidesHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Sample Label',
  },
};
