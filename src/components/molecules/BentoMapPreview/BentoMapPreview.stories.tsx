import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BentoMapPreview } from './BentoMapPreview';
import { View } from 'react-native';

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
