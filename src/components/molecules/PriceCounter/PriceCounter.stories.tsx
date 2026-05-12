import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PriceCounter } from './PriceCounter';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/PriceCounter',
  component: PriceCounter,

} satisfies Meta<typeof PriceCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 450,
    label: "Sample Label",
    variant: "primary"
  },
};
