import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UpcomingRideCard } from './UpcomingRideCard';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/UpcomingRideCard',
  component: UpcomingRideCard,
} satisfies Meta<typeof UpcomingRideCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DriverHost: Story = {
  args: {
    timerLabel: 'Tue, Jun 30',
    driverName: '',
    carModel: 'Your Vehicle',
    rating: 0,
    price: '₹230',
    avatarUri: '',
    isVerified: true,
    pickupTime: '8:00 AM',
    pickupLocation: '164, Chowk Bazar, Mathura',
    dropoffTime: '10:05 AM',
    dropoffLocation: 'Predomix Technologies Pvt. Ltd',
    isDriver: true,
    onMorePress: () => {},
    onChatPress: () => {},
    onPress: () => {},
  },
};

export const PassengerBooked: Story = {
  args: {
    timerLabel: 'Tue, Jun 30',
    driverName: 'one zero',
    carModel: 'SEDAN (DL3C-XX-1234)',
    rating: 5,
    price: '₹230',
    avatarUri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    isVerified: true,
    pickupTime: '8:00 AM',
    pickupLocation: '164, Chowk Bazar, Mathura',
    dropoffTime: '10:05 AM',
    dropoffLocation: 'Predomix Technologies Pvt. Ltd',
    statusTag: 'PENDING',
    isDriver: false,
    onMorePress: () => {},
    onChatPress: () => {},
    onPress: () => {},
  },
};
