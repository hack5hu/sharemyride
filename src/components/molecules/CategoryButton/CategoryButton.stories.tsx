import React from 'react';
import { View } from 'react-native';
import { CategoryButton } from './CategoryButton';
import type { Meta, StoryObj } from '@storybook/react-native';

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
