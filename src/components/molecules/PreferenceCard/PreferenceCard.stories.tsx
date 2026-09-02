import React from 'react';
import { View } from 'react-native';
import { PreferenceCard } from './PreferenceCard';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/PreferenceCard',
  component: PreferenceCard,
} satisfies Meta<typeof PreferenceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for PreferenceCard
  },
};
