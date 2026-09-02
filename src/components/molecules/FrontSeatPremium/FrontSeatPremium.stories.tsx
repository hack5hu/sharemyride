import React from 'react';
import { View } from 'react-native';
import { FrontSeatPremium } from './FrontSeatPremium';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/FrontSeatPremium',
  component: FrontSeatPremium,
} satisfies Meta<typeof FrontSeatPremium>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
  },
};
