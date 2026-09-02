import React from 'react';
import { View } from 'react-native';
import { PreferencesSection } from './PreferencesSection';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/PreferencesSection',
  component: PreferencesSection,
} satisfies Meta<typeof PreferencesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for PreferencesSection
  },
};
