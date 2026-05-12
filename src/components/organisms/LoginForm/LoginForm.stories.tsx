import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { View } from 'react-native';

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
