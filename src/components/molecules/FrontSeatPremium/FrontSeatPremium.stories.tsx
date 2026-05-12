import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FrontSeatPremium } from './FrontSeatPremium';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/FrontSeatPremium',
  component: FrontSeatPremium,

} satisfies Meta<typeof FrontSeatPremium>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sample Title"
  },
};
