import { type LocalRideItemData } from '@/components/templates/LocalRideResultsTemplate/components/LocalRideCard/types.d';
import { type Location } from '@/store/useLocationStore';
import { formatTimeSafely } from '@/utils/date';
import { calculateDistance } from '@/utils/location';
import { decodePolyline } from '@/utils/polyline';

export const mapRawSearchResults = (
  searchResults: any[] | null,
  startLocation: Location | null,
  destinationLocation: Location | null,
): LocalRideItemData[] => {
  if (!searchResults || !Array.isArray(searchResults)) return [];

  return searchResults.map((ride, index) => {
    const id = String(ride.id || index);
    const sourceLat = Number(ride.sourceLat ?? ride.stops?.[0]?.lat ?? 0);
    const sourceLon = Number(ride.sourceLon ?? ride.stops?.[0]?.lon ?? 0);
    const destLat = Number(
      ride.destinationLat ??
        ride.destLat ??
        ride.stops?.[ride.stops?.length - 1]?.lat ??
        0,
    );
    const destLon = Number(
      ride.destinationLon ??
        ride.destLon ??
        ride.stops?.[ride.stops?.length - 1]?.lon ??
        0,
    );

    const pickupDist =
      startLocation && sourceLat && sourceLon
        ? calculateDistance(
            startLocation.latitude,
            startLocation.longitude,
            sourceLat,
            sourceLon,
          ) * 1000
        : undefined;

    const dropoffDist =
      destinationLocation && destLat && destLon
        ? calculateDistance(
            destinationLocation.latitude,
            destinationLocation.longitude,
            destLat,
            destLon,
          ) * 1000
        : undefined;

    const rawRating = Number(ride.driverRating);
    const rating = !isNaN(rawRating) && rawRating > 0 ? rawRating : 5.0;

    return {
      id,
      driverName: ride.driverName ? ride.driverName.trim() : 'Verified Host',
      driverPhotoUrl: ride.driverPhotoUrl || undefined,
      driverRating: rating,
      vehicleModel: ride.vehicleModel || ride.vehicleType || 'Car',
      vehicleType: ride.vehicleType,
      startTime: formatTimeSafely(
        ride.startTime || ride.stops?.[0]?.arrivalTime,
        { hour: '2-digit', minute: '2-digit' },
        'TBD',
        false,
      ),
      duration: ride.duration || undefined,
      price: Number(ride.price || ride.pricePerSeat || ride.totalPrice || 0),
      availableSeats: Number(ride.availableSeats || 1),
      pickupDistanceMeters: pickupDist,
      dropoffDistanceMeters: dropoffDist,
      sourceStopName: ride.sourceStopName || ride.sourceAddress,
      destinationStopName: ride.destinationStopName || ride.destinationAddress,
      sourceStopId: ride.sourceStopId,
      destinationStopId: ride.destinationStopId,
      routePath: ride.routePath || ride.encodedPolyline,
      encodedPolyline: ride.encodedPolyline || ride.routePath,
      sourceCoords: { latitude: sourceLat, longitude: sourceLon },
      destCoords: { latitude: destLat, longitude: destLon },
    };
  });
};

export const buildDriverRouteGeoJSON = (activeRide: LocalRideItemData | null) => {
  if (!activeRide) return null;

  let coordinates: [number, number][] = [];
  if (activeRide.routePath || activeRide.encodedPolyline) {
    coordinates = decodePolyline(
      activeRide.routePath || activeRide.encodedPolyline || '',
    );
  }

  if (coordinates.length === 0 && activeRide.sourceCoords.latitude !== 0) {
    coordinates = [
      [activeRide.sourceCoords.longitude, activeRide.sourceCoords.latitude],
      [activeRide.destCoords.longitude, activeRide.destCoords.latitude],
    ];
  }

  if (coordinates.length === 0) return null;

  return {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates,
    },
  };
};

export const buildConnectorGeoJSON = (
  from: { latitude: number; longitude: number } | null,
  to: { latitude: number; longitude: number } | null,
) => {
  if (!from || !to || from.latitude === 0 || to.latitude === 0) return null;

  return {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates: [
        [from.longitude, from.latitude],
        [to.longitude, to.latitude],
      ],
    },
  };
};

export const formatDistanceText = (meters?: number): string | null => {
  if (meters === undefined || meters === null) return null;
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${Math.round(meters)}m`;
};

export const calculateMidpoint = (
  a: { latitude: number; longitude: number } | null,
  b: { latitude: number; longitude: number } | null,
): [number, number] | null => {
  if (!a || !b || a.latitude === 0 || b.latitude === 0) return null;
  return [(a.longitude + b.longitude) / 2, (a.latitude + b.latitude) / 2];
};
