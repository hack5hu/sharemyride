import React from 'react';
import { View } from 'react-native';
import { SocialButton } from './SocialButton';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Molecules/SocialButton',
  component: SocialButton,
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for SocialButton
  },
};
