import React from 'react';
import { View } from 'react-native';
import { BentoMapPreview } from './BentoMapPreview';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/BentoMapPreview',
  component: BentoMapPreview,
} satisfies Meta<typeof BentoMapPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for BentoMapPreview
  },
};
