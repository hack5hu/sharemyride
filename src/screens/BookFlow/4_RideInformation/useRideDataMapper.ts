import { useMemo } from 'react';
import { RideData } from '@/screens/BookFlow/3_AvailableRides/types';
import { calculateDistance } from '@/utils/location';

export const mapBackendRideToUI = (
  rideRaw: any, 
  startLocation?: any, 
  destinationLocation?: any, 
  sourceStopId?: number, 
  destinationStopId?: number
) => {
  if (!rideRaw) return null;

  const features: string[] = [];
  if (rideRaw.preferences?.nonSmoking) features.push('noSmoking');
  if (rideRaw.preferences?.womenOnly) features.push('ladiesOnly');
  if (rideRaw.preferences?.petFriendly) features.push('petFriendly');
  if (rideRaw.preferences?.luggageAllowed) features.push('luggageAllowed');
  if (rideRaw.preferences?.manualApproval) {
    features.push('manualApproval');
  } else if (rideRaw.preferences?.manualApproval === false) {
    features.push('autoApproval');
  }
  if (rideRaw.preferences?.musicPreference) features.push(`music:${rideRaw.preferences.musicPreference}`);

  const firstStop = rideRaw.stops?.[0];
  const lastStop = rideRaw.stops?.[rideRaw.stops.length - 1];

  const pickupDistance = (startLocation && firstStop) 
    ? calculateDistance(startLocation.latitude, startLocation.longitude, firstStop.lat, firstStop.lon)
    : undefined;
  
  const dropoffDistance = (destinationLocation && lastStop)
    ? calculateDistance(destinationLocation.latitude, destinationLocation.longitude, lastStop.lat, lastStop.lon)
    : undefined;

  const stops = rideRaw.stops || [];
  const sourceIdx = stops.findIndex((s: any) => s.id === sourceStopId);
  const destIdx = stops.findIndex((s: any) => s.id === destinationStopId);
  const [startIdx, endIdx] = [sourceIdx, destIdx].sort((a, b) => a - b);

  const timeline = stops.map((stop: any, idx: number, arr: any[]) => {
    const isHighlighted = stop.id === sourceStopId || stop.id === destinationStopId;
    const address = stop.stopName || stop.name || 'Unknown';
    let displayLocation = address;
    const isBetweenOrAt = idx >= startIdx && idx <= endIdx && startIdx !== -1 && endIdx !== -1;
    
    const isDriverRole = rideRaw.userRole === 'DRIVER';
    
    // Only truncate if NOT highlighted AND NOT driver
    if (!isHighlighted && !isDriverRole) {
      const parts = address.split(', ');
      if (parts.length >= 3) {
        displayLocation = parts[parts.length - 3];
      } else {
        displayLocation = parts[0];
      }
    }

    let durationSincePrevious = '';
    if (idx > 0) {
      const prevStop = arr[idx - 1];
      if (prevStop.arrivalTime && stop.arrivalTime) {
        const diffMins = Math.round((new Date(stop.arrivalTime).getTime() - new Date(prevStop.arrivalTime).getTime()) / (1000 * 60));
        const h = Math.floor(diffMins / 60);
        const m = diffMins % 60;
        durationSincePrevious = h > 0 ? `${h}h${m > 0 ? m : ''}` : `${m}m`;
      }
    }

    return {
      id: stop.id,
      time: stop.arrivalTime ? new Date(stop.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'TBD',
      durationSincePrevious,
      location: displayLocation,
      type: idx === 0 ? 'pickup' : (idx === arr.length - 1 ? 'destination' : 'stop'),
      description: isHighlighted ? (idx === 0 ? 'Pickup' : (idx === arr.length - 1 ? 'Dropoff' : 'Stop')) : '',
      isHighlighted,
    };
  });

  let totalDurationMins = 0;
  if (rideRaw.duration) {
    const hMatch = rideRaw.duration.match(/(\d+)h/);
    const mMatch = rideRaw.duration.match(/(\d+)m/);
    if (hMatch) totalDurationMins += parseInt(hMatch[1]) * 60;
    if (mMatch) totalDurationMins += parseInt(mMatch[1]);
  }

  return {
    id: rideRaw.id,
    driver: {
      name: rideRaw.driver?.name || 'Unknown Driver',
      rating: rideRaw.driver?.rating || 4.8,
      rideCount: 15,
      avatar: rideRaw.driver?.photoUrl || 'https://ui-avatars.com/api/?name=' + (rideRaw.driver?.name || 'U'),
      driverPhotoUrl: rideRaw.driver?.photoUrl,
      isVerified: !!rideRaw.driver?.verified,
      bio: rideRaw.driver?.bio,
    },
    price: rideRaw.price || 0,
    timeline,
    features,
    seatsLeft: rideRaw.availableSeats || 0,
    isFrequentCoRider: false,
    pickupDistance,
    dropoffDistance,
    departureHour: firstStop?.arrivalTime ? new Date(firstStop.arrivalTime).getHours() : undefined,
    vehicle: {
      registration: rideRaw.vehicle?.plateNumber || 'UP-16-AX-0000',
      model: rideRaw.vehicle?.model,
      color: rideRaw.vehicle?.color,
      type: rideRaw.vehicle?.type,
      company: rideRaw.vehicle?.company,
    },
    totalDistance: rideRaw.stops?.reduce((acc: number, stop: any) => acc + (stop.distanceFromPreviousStop || 0), 0) || 0,
    totalDuration: totalDurationMins,
    routePath: rideRaw.routePath,
    seats: rideRaw.seats || [],
    passengers: rideRaw.passengers || [],
    departureDate: firstStop?.arrivalTime
      ? new Date(firstStop.arrivalTime).toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
      : 'Today',
    departureTime: firstStop?.arrivalTime
      ? new Date(firstStop.arrivalTime).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      : '--:--',
    rawStops: stops.map((s: any) => ({
      lat: s.lat,
      lon: s.lon,
      name: s.stopName || s.name,
      sequence: s.sequence,
      arrivalTime: s.arrivalTime,
      id: s.id,
    })),
    userRole: rideRaw.userRole,
    bookingPrice: rideRaw.myBooking?.price ?? rideRaw.price ?? 0,
    seatsBooked: rideRaw.myBooking?.seatsBooked ?? 0,
    seatNames: rideRaw.myBooking?.seatNames ?? [],
    paymentMethod: rideRaw.paymentMethod ?? 'Cash',
  } as any;
};

export const useRideDataMapper = (
  rideRaw: any, 
  startLocation: any, 
  destinationLocation: any, 
  sourceStopId?: number, 
  destinationStopId?: number
) => {
  return useMemo(() => 
    mapBackendRideToUI(rideRaw, startLocation, destinationLocation, sourceStopId, destinationStopId),
    [rideRaw, startLocation, destinationLocation, sourceStopId, destinationStopId]
  );
};
