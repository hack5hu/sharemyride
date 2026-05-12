import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LocationInput } from './LocationInput';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/LocationInput',
  component: LocationInput,

} satisfies Meta<typeof LocationInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Sample Label"
  },
};
