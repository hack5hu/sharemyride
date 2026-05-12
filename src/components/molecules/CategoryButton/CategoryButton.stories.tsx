import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CategoryButton } from './CategoryButton';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/CategoryButton',
  component: CategoryButton,

} satisfies Meta<typeof CategoryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for CategoryButton
  },
};
