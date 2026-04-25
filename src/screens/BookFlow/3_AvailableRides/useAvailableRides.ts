import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';
import { RideData } from './types';
import { useBookRideStore } from '@/store/useBookRideStore';
import { calculateDistance } from '@/utils/location';
import { calculateSegmentPrice } from '@/utils/pricing';

export const useAvailableRides = () => {
  const navigation = useNavigation();
  const { availableRides: t, rideFilters: ft } = useLocale();
  const { searchResults, startLocation, destinationLocation } = useBookRideStore();

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Safely map backend data to RideData if present, otherwise an empty array.
  const mappedRides: RideData[] = useMemo(() => {
    if (!searchResults || searchResults.length === 0) return [];
    
    return searchResults.map((ride, index) => {
      
      const firstStop = ride.stops?.[0];
      const lastStop = ride.stops?.[ride.stops?.length - 1];
      const totalPrice = calculateSegmentPrice(ride.stops || [], ride.fullJourneyPrice);

      // Extract features from preferences
      const features: string[] = [];
      if (ride.preferences?.nonSmoking) features.push('noSmoking');
      if (ride.preferences?.womenOnly) features.push('ladiesOnly');
      if (ride.preferences?.petFriendly) features.push('petFriendly');
      if (ride.preferences?.luggageAllowed) features.push('luggageAllowed');
      if (ride.preferences?.manualApproval) features.push('manualApproval');
      if (ride.preferences?.musicPreference) features.push(`music:${ride.preferences.musicPreference}`);

      const pickupDistance = (startLocation && firstStop) 
        ? calculateDistance(startLocation.latitude, startLocation.longitude, firstStop.lat, firstStop.lon)
        : 9999;
      
      const dropoffDistance = (destinationLocation && lastStop)
        ? calculateDistance(destinationLocation.latitude, destinationLocation.longitude, lastStop.lat, lastStop.lon)
        : 9999;

      return {
        id: ride.id || String(index),
        driver: {
          name: ride.driverName || 'Unknown Driver',
          rating: 4.8,
          rideCount: 15,
          avatar: ride.driverPhotoUrl || 'https://ui-avatars.com/api/?name=' + (ride.driverName || 'U'),
          driverPhotoUrl: ride.driverPhotoUrl,
          isVerified: true,
        },
        price: totalPrice,
        timeline: ride.stops
          ? ride.stops.map((stop: any, idx: number, arr: any[]) => ({
              time: stop.arrivalTime
                ? new Date(stop.arrivalTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'TBD',
              location: stop.name || 'Unknown Location',
              type:
                idx === 0
                  ? 'pickup'
                  : idx === arr.length - 1
                  ? 'destination'
                  : 'stop',
            }))
          : [],
        features: features,
        seatsLeft: ride.availableSeats ? ride.availableSeats.length : 0,
        isFrequentCoRider: false,
        pickupDistance,
        dropoffDistance,
        totalDuration: (ride.stops && firstStop?.arrivalTime && lastStop?.arrivalTime)
          ? Math.round((new Date(lastStop.arrivalTime).getTime() - new Date(firstStop.arrivalTime).getTime()) / (1000 * 60))
          : 0,
        departureHour: firstStop?.arrivalTime
          ? new Date(firstStop.arrivalTime).getHours()
          : undefined,
      } as any;
    });
  }, [searchResults, startLocation, destinationLocation]);

  const filteredRides = useMemo(() => {
    let result = [...mappedRides];

    if (selectedFilters.length > 0) {
      result = result.filter((ride) => {
        const preferenceFilters = selectedFilters.filter(f => !f.startsWith('time_') && f !== 'time');
        const timeFilters = selectedFilters.filter(f => f.startsWith('time_'));

        // All preference filters must match (AND)
        const matchesPreferences = preferenceFilters.every((filterId) => {
          if (filterId === 'noSmoking') return ride.features.includes('noSmoking');
          if (filterId === 'ladiesOnly') return ride.features.includes('ladiesOnly');
          if (filterId === 'topRated') return ride.driver.rating >= 4.5;
          if (filterId === 'petFriendly') return ride.features.includes('petFriendly');
          if (filterId === 'luggageAllowed') return ride.features.includes('luggageAllowed');
          if (filterId === 'manualApproval') return ride.features.includes('manualApproval');
          return true;
        });

        if (!matchesPreferences) return false;

        // If time filters are selected, at least one must match (OR)
        if (timeFilters.length > 0) {
          if (ride.departureHour === undefined) return false;
          return timeFilters.some((slot) => {
            const [_, start, end] = slot.split('_').map(Number);
            return ride.departureHour! >= start && ride.departureHour! < end;
          });
        }

        return true;
      });
    }

    if (selectedFilters.includes('time')) {
      result.sort((a, b) => {
        const timeA = a.timeline[0]?.time || 'TBD';
        const timeB = b.timeline[0]?.time || 'TBD';
        return timeA.localeCompare(timeB);
      });
    }

    if (selectedFilters.includes('nearPickup')) {
      result.sort((a, b) => (a.pickupDistance || 0) - (b.pickupDistance || 0));
    }

    if (selectedFilters.includes('nearDropoff')) {
      result.sort((a, b) => (a.dropoffDistance || 0) - (b.dropoffDistance || 0));
    }

    return result;
  }, [mappedRides, selectedFilters]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleRideSelect = useCallback((rideId: string) => {
    navigation.navigate('RideInformation' as any, { rideId });
  }, [navigation]);

  const handleOpenFilters = useCallback(() => {
    setIsFilterModalOpen(true);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setIsFilterModalOpen(false);
  }, []);

  const toggleFilter = useCallback((filter: string) => {
    setSelectedFilters(prev => {
      const isAlreadySelected = prev.includes(filter);
      
      if (isAlreadySelected) {
        return prev.filter(f => f !== filter);
      } else {
        // Enforce mutual exclusivity for Near Pickup and Near Dropoff
        if (filter === 'nearPickup') {
          return [...prev.filter(f => f !== 'nearDropoff'), 'nearPickup'];
        }
        if (filter === 'nearDropoff') {
          return [...prev.filter(f => f !== 'nearPickup'), 'nearDropoff'];
        }
        return [...prev, filter];
      }
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedFilters([]);
  }, []);
  
  const handleApplyFilters = useCallback((filters: string[]) => {
    setSelectedFilters(filters);
  }, []);

  const handleViewDetails = useCallback((rideId: string) => {
    console.log('Viewing details:', rideId);
  }, []);

  return {
    mockRides: filteredRides,
    selectedFilters,
    isFilterModalOpen,
    toggleFilter,
    handleOpenFilters,
    handleCloseFilters,
    handleClearFilters,
    handleApplyFilters,
    handleBack,
    handleRideSelect,
    handleViewDetails,
    t,
    ft,
  };
};
