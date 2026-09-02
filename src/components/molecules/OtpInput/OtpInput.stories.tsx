import React from 'react';
import { View } from 'react-native';
import { OtpInput } from './OtpInput';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/OtpInput',
  component: OtpInput,
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for OtpInput
  },
};
