import React from 'react';
import { View } from 'react-native';
import { LoginForm } from './LoginForm';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/LoginForm',
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for LoginForm
  },
};
