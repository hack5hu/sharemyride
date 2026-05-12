import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/SearchInput',
  component: SearchInput,

} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for SearchInput
  },
};
