import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { SocialSection } from './SocialSection';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/SocialSection',
  component: SocialSection,
} satisfies Meta<typeof SocialSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for SocialSection
  },
};
