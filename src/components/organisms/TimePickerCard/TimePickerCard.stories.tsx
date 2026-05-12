import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimePickerCard } from './TimePickerCard';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/TimePickerCard',
  component: TimePickerCard,

} satisfies Meta<typeof TimePickerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for TimePickerCard
  },
};
