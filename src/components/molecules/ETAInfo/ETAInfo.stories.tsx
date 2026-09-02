import React from 'react';
import { View } from 'react-native';
import { ETAInfo } from './ETAInfo';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/ETAInfo',
  component: ETAInfo,
} satisfies Meta<typeof ETAInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for ETAInfo
  },
};
