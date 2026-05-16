import React from 'react';
import { UserLocationMarker } from './UserLocationMarker';
import { Box } from '@/components/atoms/Box';

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
