import React from 'react';
import { View } from 'react-native';
import { MiddleStopsList } from './MiddleStopsList';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/MiddleStopsList',
  component: MiddleStopsList,
} satisfies Meta<typeof MiddleStopsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for MiddleStopsList
  },
};
