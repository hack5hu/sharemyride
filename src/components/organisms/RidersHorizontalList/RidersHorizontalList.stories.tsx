import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RidersHorizontalList } from './RidersHorizontalList';
import { View } from 'react-native';

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
