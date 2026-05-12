import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TrustInfoBar } from './TrustInfoBar';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/TrustInfoBar',
  component: TrustInfoBar,

} satisfies Meta<typeof TrustInfoBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for TrustInfoBar
  },
};
