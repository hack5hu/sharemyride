import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OlaMap } from './OlaMap';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/OlaMap',
  component: OlaMap,

} satisfies Meta<typeof OlaMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "User Name"
  },
};
