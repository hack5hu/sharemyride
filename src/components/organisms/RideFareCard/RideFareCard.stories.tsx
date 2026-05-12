import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RideFareCard } from './RideFareCard';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/RideFareCard',
  component: RideFareCard,

} satisfies Meta<typeof RideFareCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 450,
    t: {}
  },
};
