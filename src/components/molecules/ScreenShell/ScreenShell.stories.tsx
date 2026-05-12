import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScreenShell } from './ScreenShell';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/ScreenShell',
  component: ScreenShell,

} satisfies Meta<typeof ScreenShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sample Title"
  },
};
