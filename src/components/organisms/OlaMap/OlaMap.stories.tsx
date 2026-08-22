import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { OlaMap } from './OlaMap';

const meta = {
  title: 'Organisms/OlaMap',
  component: OlaMap,
} satisfies Meta<typeof OlaMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

