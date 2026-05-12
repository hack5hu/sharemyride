import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CounterButton } from './CounterButton';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/CounterButton',
  component: CounterButton,

} satisfies Meta<typeof CounterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPress: () => console.log("Pressed"),
    type: "default",
    size: "md"
  },
};
