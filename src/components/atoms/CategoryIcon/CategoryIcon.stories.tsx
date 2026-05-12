import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CategoryIcon } from './CategoryIcon';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/CategoryIcon',
  component: CategoryIcon,

} satisfies Meta<typeof CategoryIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for CategoryIcon
  },
};
