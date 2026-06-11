import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MapViewer } from './MapViewer';
import { RideStatus, RideDetails } from './types.d';

const mockScheduledRide: RideDetails = {
  id: 'scheduled-101',
  isDriver: false,
  status: RideStatus.SCHEDULED,
  maskedLocation: {
    center: {
      latitude: 28.6139,
      longitude: 77.209,
    },
    radius: 1500,
  },
};

const mockActiveDriverRide: RideDetails = {
  id: 'active-202',
  isDriver: true,
  status: RideStatus.ACTIVE,
  driverLocation: {
    latitude: 28.6139,
    longitude: 77.209,
  },
  passengers: [
    {
      id: 'p1',
      name: 'Rohan Sharma',
      pickupLocation: {
        latitude: 28.62,
        longitude: 77.215,
      },
    },
    {
      id: 'p2',
      name: 'Sneha Patel',
      pickupLocation: {
        latitude: 28.61,
        longitude: 77.2,
      },
    },
  ],
};

const mockActivePassengerRide: RideDetails = {
  id: 'active-303',
  isDriver: false,
  status: RideStatus.ACTIVE,
  driverLocation: {
    latitude: 28.6139,
    longitude: 77.209,
  },
  myPickupLocation: {
    latitude: 28.62,
    longitude: 77.215,
  },
  unifiedPolyline: 's_v`FcwixM_AmC{BwEqB}D_@sA', // Mock simple polyline string
};

const meta = {
  title: 'Organisms/MapViewer',
  component: MapViewer,
} satisfies Meta<typeof MapViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScheduledPreTrip: Story = {
  args: {
    rideDetails: mockScheduledRide,
  },
};

export const ActiveDriverView: Story = {
  args: {
    rideDetails: mockActiveDriverRide,
  },
};

export const ActivePassengerView: Story = {
  args: {
    rideDetails: mockActivePassengerRide,
  },
};
