import React from 'react';
import { View } from 'react-native';
import { SafetyBanner } from './SafetyBanner';
import type { Meta, StoryObj } from '@storybook/react-native';

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
