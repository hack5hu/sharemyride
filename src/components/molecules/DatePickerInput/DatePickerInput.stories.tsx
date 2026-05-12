import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePickerInput } from './DatePickerInput';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/DatePickerInput',
  component: DatePickerInput,

} satisfies Meta<typeof DatePickerInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Sample Label",
    date: new Date().toLocaleDateString()
  },
};
