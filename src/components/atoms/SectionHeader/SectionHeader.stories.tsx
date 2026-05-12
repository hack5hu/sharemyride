import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from './SectionHeader';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/SectionHeader',
  component: SectionHeader,

} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for SectionHeader
  },
};
