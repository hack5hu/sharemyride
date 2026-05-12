import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PassengerManagement } from './PassengerManagement';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/PassengerManagement',
  component: PassengerManagement,

} satisfies Meta<typeof PassengerManagement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    t: {}
  },
};
