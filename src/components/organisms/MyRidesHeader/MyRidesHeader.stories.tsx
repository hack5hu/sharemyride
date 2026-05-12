import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MyRidesHeader } from './MyRidesHeader';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/MyRidesHeader',
  component: MyRidesHeader,

} satisfies Meta<typeof MyRidesHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Sample Label"
  },
};
