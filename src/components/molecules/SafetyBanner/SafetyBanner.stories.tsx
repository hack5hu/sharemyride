import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SafetyBanner } from './SafetyBanner';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/SafetyBanner',
  component: SafetyBanner,

} satisfies Meta<typeof SafetyBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for SafetyBanner
  },
};
