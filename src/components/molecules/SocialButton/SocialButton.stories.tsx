import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SocialButton } from './SocialButton';
import { View } from 'react-native';

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
