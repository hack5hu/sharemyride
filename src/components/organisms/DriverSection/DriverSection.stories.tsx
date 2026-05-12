import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DriverSection } from './DriverSection';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/DriverSection',
  component: DriverSection,

} satisfies Meta<typeof DriverSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for DriverSection
  },
};
