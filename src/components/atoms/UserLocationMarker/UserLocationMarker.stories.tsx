import React from 'react';
import { Box } from '@/components/atoms/Box';
import { UserLocationMarker } from './UserLocationMarker';

export default {
  title: 'Atoms/UserLocationMarker',
  component: UserLocationMarker,
};

export const Default = () => (
  <Box flex={1} alignItems="center" justifyContent="center" bg="surface">
    <UserLocationMarker />
  </Box>
);

export const WithHeading = () => (
  <Box flex={1} alignItems="center" justifyContent="center" bg="surface">
    <UserLocationMarker heading={45} />
  </Box>
);
