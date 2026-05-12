import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ReasonSelectorItem } from './ReasonSelectorItem';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/ReasonSelectorItem',
  component: ReasonSelectorItem,

} satisfies Meta<typeof ReasonSelectorItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for ReasonSelectorItem
  },
};
