import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MiddleStopSearchOverlay } from './MiddleStopSearchOverlay';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/MiddleStopSearchOverlay',
  component: MiddleStopSearchOverlay,

} satisfies Meta<typeof MiddleStopSearchOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchQuery: '',
    onChangeSearch: () => {},
    suggestedLocations: [],
    recentHistory: [
      {
        id: '1',
        name: 'Indiranagar Metro Station',
        address: 'Indiranagar Double Rd, Stage 3, Indiranagar, Bengaluru',
        latitude: 12.9718,
        longitude: 77.6412,
      },
      {
        id: '2',
        name: 'Koramangala Sony World Signal',
        address: '80 Feet Rd, Koramangala 4th Block, Bengaluru',
        latitude: 12.9348,
        longitude: 77.6254,
      },
    ],
    isLoading: false,
    onSelectLocation: (loc) => console.log('Selected location:', loc),
    onSelectHistory: (loc) => console.log('Selected history:', loc),
  },
};

export const Searching: Story = {
  args: {
    ...Default.args,
    searchQuery: 'MG Road',
    suggestedLocations: [
      {
        id: '101',
        name: 'MG Road Metro Station',
        address: 'Mahatma Gandhi Rd, Bengaluru, Karnataka 560001',
        latitude: 12.9754,
        longitude: 77.6068,
        distanceFromRoute: 0.8,
      },
      {
        id: '102',
        name: 'MG Road Mall',
        address: '12, MG Road, Ashok Nagar, Bengaluru, Karnataka 560001',
        latitude: 12.9740,
        longitude: 77.6095,
        distanceFromRoute: 2.5,
      },
    ],
  },
};
