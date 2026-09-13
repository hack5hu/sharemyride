import { RideType } from '@/constants/enums';
import { type PublishSnapshot, type RouteLeg } from '@/store/types/publish';
import { useRidePublishStore } from '@/store/useRidePublishStore';

export const makeLegs = (...distances: number[]): RouteLeg[] =>
  distances.map((distance, i) => ({
    distanceMeters: distance,
    durationSeconds: distance / 10,
    startAddress: 'Stop ' + i,
    endAddress: 'Stop ' + (i + 1),
  }));

export const makePublishSnapshot = (
  rideType = RideType.INTERCITY,
  distances = [5000, 5000],
): PublishSnapshot => {
  const legs = makeLegs(...distances);
  const locations = Array.from({ length: legs.length + 1 }, (_, i) => ({
    id: String(i),
    name: 'Stop ' + i,
    address: 'Stop ' + i,
    latitude: 28 + i / 100,
    longitude: 77,
  }));

  return {
    ...useRidePublishStore.getState(),
    rideType,
    startLocation: locations[0],
    destinationLocation: locations[locations.length - 1],
    middleStops: locations.slice(1, -1),
    routeDetails: {
      totalDistanceMeters: distances.reduce((a, b) => a + b, 0),
      totalDurationSeconds: legs.reduce((a, b) => a + b.durationSeconds, 0),
      legs,
    },
    selectedRoute: {
      coordinates: [
        [77, 28],
        [77, 28.1],
      ],
      bounds: [77, 28, 77, 28.1],
      polylineString: 'encoded-route',
      uiData: {
        id: 'route-1',
        title: 'Route',
        distance: '10 km',
        duration: '10 min',
        description: '',
        iconName: 'straighten',
      },
    },
    price: 50,
    fullJourneyPrice: 999,
    frontSeatPrice: 999,
    segmentPrices: {},
    premiumEnabled: true,
    premiumPercentage: 10,
    publishVehicleType: '5',
    vehicleId: 'vehicle-1',
    selectedSeatIds: [2, 3],
    seatCount: 2,
    departureDate: '2099-01-01',
    departureDates: ['2099-01-01'],
    departureTime: '10:30 AM',
  };
};
