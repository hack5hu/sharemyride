import React from 'react';
import { View } from 'react-native';
import { MonthCalendar } from './MonthCalendar';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/MonthCalendar',
  component: MonthCalendar,
} satisfies Meta<typeof MonthCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date().toLocaleDateString(),
  },
};
