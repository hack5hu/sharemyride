import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LocationInputsBento } from './LocationInputsBento';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/LocationInputsBento',
  component: LocationInputsBento,

} satisfies Meta<typeof LocationInputsBento>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for LocationInputsBento
  },
};
