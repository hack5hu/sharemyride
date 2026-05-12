import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InfoBox } from './InfoBox';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/InfoBox',
  component: InfoBox,

} satisfies Meta<typeof InfoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for InfoBox
  },
};
