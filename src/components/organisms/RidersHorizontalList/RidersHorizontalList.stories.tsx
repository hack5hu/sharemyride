import React from 'react';
import { View } from 'react-native';
import { RidersHorizontalList } from './RidersHorizontalList';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/RidersHorizontalList',
  component: RidersHorizontalList,
} satisfies Meta<typeof RidersHorizontalList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for RidersHorizontalList
  },
};
