import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useLocale } from '@/constants/localization';
import { useBookRideStore } from '@/store/useBookRideStore';
// ... existing imports ...

import { RideData } from '@/screens/BookFlow/3_AvailableRides/types';
import { calculateDistance } from '@/utils/location';

export const useRideInformation = (rideId: string) => {
  const navigation = useNavigation();
  const { rideInformation: t } = useLocale();

  // Mock data for the specific ride - in a real app, this would come from a store or API
  const { searchResults, startLocation, destinationLocation } = useBookRideStore();
  
  const ride: RideData | null = useMemo(() => {
    if (!searchResults || !rideId) return null;
    
    const rideRaw = searchResults.find(r => r.id === rideId);
    if (!rideRaw) return null;

    // Mapping logic (same as in useAvailableRides)
    const totalPrice = rideRaw.stops?.reduce((acc: number, stop: any) => acc + (stop.priceFromPreviousStop || 0), 0) || 0;
    const features: string[] = [];
    if (rideRaw.preferences?.nonSmoking) features.push('noSmoking');
    if (rideRaw.preferences?.womenOnly) features.push('ladiesOnly');
    if (rideRaw.preferences?.petFriendly) features.push('petFriendly');
    if (rideRaw.preferences?.luggageAllowed) features.push('luggageAllowed');
    if (rideRaw.preferences?.manualApproval) features.push('manualApproval');
    if (rideRaw.preferences?.musicPreference) features.push(`music:${rideRaw.preferences.musicPreference}`);

    const firstStop = rideRaw.stops?.[0];
    const lastStop = rideRaw.stops?.[rideRaw.stops.length - 1];

    const pickupDistance = (startLocation && firstStop) 
      ? calculateDistance(startLocation.latitude, startLocation.longitude, firstStop.lat, firstStop.lon)
      : undefined;
    
    const dropoffDistance = (destinationLocation && lastStop)
      ? calculateDistance(destinationLocation.latitude, destinationLocation.longitude, lastStop.lat, lastStop.lon)
      : undefined;

    return {
      id: rideRaw.id,
      driver: {
        name: rideRaw.driverName || 'Unknown Driver',
        rating: 4.8,
        rideCount: 15,
        avatar: rideRaw.driverPhotoUrl || 'https://ui-avatars.com/api/?name=' + (rideRaw.driverName || 'U'),
        driverPhotoUrl: rideRaw.driverPhotoUrl,
        isVerified: true,
      },
      price: totalPrice,
      timeline: rideRaw.stops ? rideRaw.stops.map((stop: any, idx: number, arr: any[]) => ({
        time: stop.arrivalTime ? new Date(stop.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'TBD',
        location: stop.name || 'Unknown Location',
        type: idx === 0 ? 'pickup' : (idx === arr.length - 1 ? 'destination' : 'stop'),
        description: idx === 0 ? 'Pickup' : (idx === arr.length - 1 ? 'Dropoff' : 'Stop'),
      })) : [],
      features: features,
      seatsLeft: rideRaw.availableSeats ? rideRaw.availableSeats.length : 0,
      isFrequentCoRider: false,
      pickupDistance,
      dropoffDistance,
      departureHour: firstStop?.arrivalTime ? new Date(firstStop.arrivalTime).getHours() : undefined,
      vehicle: {
        registration: rideRaw.vehicleRegistration || 'UP-16-AX-0000',
        type: (rideRaw.vehicleType || 'CAR_5_SEATER').replace('_', ' ').toLowerCase(),
      },
      totalDistance: rideRaw.stops?.reduce((acc: number, stop: any) => acc + (stop.distanceFromPreviousStop || 0), 0) || 0,
      routePath: rideRaw.routePath,
      rawStops: rideRaw.stops?.map((s: any) => ({
        lat: s.lat,
        lon: s.lon,
        name: s.name,
        sequence: s.sequence,
      })),
    } as RideData;
  }, [rideId, searchResults, startLocation, destinationLocation]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleBook = useCallback(() => {
    (navigation.navigate as any)('SeatSelection', { flow: 'book' });
  }, [navigation]);

  const handleViewRoute = useCallback(() => {
    if (ride?.routePath) {
      (navigation.navigate as any)('RideRouteMap', { 
        routePath: ride.routePath,
        stops: ride.rawStops,
      });
    }
  }, [navigation, ride]);

  const handleCopyAddress = useCallback((address: string) => {
    // In a real app, use Clipboard.setString(address)
    Alert.alert('Address Copied', address);
  }, []);

  return {
    t,
    handleBack,
    handleBook,
    handleViewRoute,
    handleCopyAddress,
    ride,
  };
};
