import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DriverProfileSummary } from './DriverProfileSummary';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/DriverProfileSummary',
  component: DriverProfileSummary,

} satisfies Meta<typeof DriverProfileSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DriverHost: Story = {
  args: {
    name: '',
    rating: 0,
    vehicleInfo: 'Your Vehicle',
    avatarUri: '',
    isDriver: true,
    iconName: 'directions-car',
  },
};

export const Passenger: Story = {
  args: {
    name: 'one zero',
    rating: 5,
    vehicleInfo: 'SEDAN (DL3C-XX-1234)',
    avatarUri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    isDriver: false,
    price: '₹230',
  },
};
