import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SeatButton } from './SeatButton';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/SeatButton',
  component: SeatButton,

} satisfies Meta<typeof SeatButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPress: () => console.log("Pressed"),
    price: 450
  },
};
