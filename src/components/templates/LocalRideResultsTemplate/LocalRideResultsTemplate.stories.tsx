import React from 'react';
import { LocalRideResultsTemplate } from './LocalRideResultsTemplate';

export default {
  title: 'Templates/LocalRideResultsTemplate',
  component: LocalRideResultsTemplate,
};

const mockRides = [
  {
    id: '1',
    driverName: 'Rohit Sharma',
    driverRating: 4.9,
    vehicleModel: 'Honda City',
    startTime: '10:30 AM',
    price: 65,
    availableSeats: 3,
    pickupDistanceMeters: 250,
    sourceCoords: { latitude: 28.6139, longitude: 77.209 },
    destCoords: { latitude: 28.7041, longitude: 77.1025 },
  },
  {
    id: '2',
    driverName: 'Priya Verma',
    driverRating: 5.0,
    vehicleModel: 'Maruti Dzire',
    startTime: '10:45 AM',
    price: 50,
    availableSeats: 2,
    pickupDistanceMeters: 500,
    sourceCoords: { latitude: 28.6145, longitude: 77.21 },
    destCoords: { latitude: 28.705, longitude: 77.103 },
  },
];

export const Default = () => (
  <LocalRideResultsTemplate
    onBack={() => {}}
    latitude={28.6139}
    longitude={77.209}
    rides={mockRides}
    selectedRideId="1"
    onSelectRide={() => {}}
    onPressDetails={() => {}}
    startAddress="Connaught Place"
    destinationAddress="Cyber City"
  />
);

export const Empty = () => (
  <LocalRideResultsTemplate
    onBack={() => {}}
    latitude={28.6139}
    longitude={77.209}
    rides={[]}
    selectedRideId={null}
    onSelectRide={() => {}}
    onPressDetails={() => {}}
    startAddress="Connaught Place"
    destinationAddress="Cyber City"
  />
);
