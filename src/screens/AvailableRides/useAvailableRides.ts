import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';
import { RideData } from './types.d';
import { useBookRideStore } from '@/store/useBookRideStore';

export const useAvailableRides = () => {
  const navigation = useNavigation();
  const { availableRides: t, rideFilters: ft } = useLocale();
  const { searchResults } = useBookRideStore();

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Safely map backend data to RideData if present, otherwise an empty array.
  const mappedRides: RideData[] = useMemo(() => {
    if (!searchResults || searchResults.length === 0) return [];
    
    return searchResults.map((ride, index) => {
      // Calculate total price from all stops
      const totalPrice = ride.stops?.reduce((acc: number, stop: any) => acc + (stop.priceFromPreviousStop || 0), 0) || 0;

      // Extract features from preferences
      const features: string[] = [];
      if (ride.preferences?.nonSmoking) features.push('noSmoking');
      if (ride.preferences?.womenOnly) features.push('ladiesOnly');
      if (ride.preferences?.petFriendly) features.push('petFriendly');
      if (ride.preferences?.luggageAllowed) features.push('luggageAllowed');

      return {
        id: ride.id || String(index),
        driver: {
          name: ride.driverName || 'Unknown Driver',
          rating: 4.8, // Fallback since rating isn't in API yet
          rideCount: 15, // Fallback
          avatar: 'https://ui-avatars.com/api/?name=' + (ride.driverName || 'U'),
          isVerified: true,
        },
        price: totalPrice,
        timeline: ride.stops ? ride.stops.map((stop: any, idx: number, arr: any[]) => ({
          time: stop.arrivalTime ? new Date(stop.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'TBD',
          location: stop.name || 'Unknown Location',
          type: idx === 0 ? 'pickup' : (idx === arr.length - 1 ? 'destination' : 'stop'),
        })) : [],
        features: features,
        seatsLeft: ride.availableSeats ? ride.availableSeats.length : 0,
        isFrequentCoRider: false,
      } as RideData;
    });
  }, [searchResults]);

  const filteredRides = useMemo(() => {
    let result = [...mappedRides];

    if (selectedFilters.length > 0) {
      result = result.filter((ride) => {
        return selectedFilters.every((filterId) => {
          if (filterId === 'noSmoking') return ride.features.includes('noSmoking');
          if (filterId === 'ladiesOnly') return ride.features.includes('ladiesOnly');
          if (filterId === 'topRated') return ride.driver.rating >= 4.5;
          if (filterId === 'petFriendly') return ride.features.includes('petFriendly');
          if (filterId === 'luggageAllowed') return ride.features.includes('luggageAllowed');
          return true;
        });
      });
    }

    if (selectedFilters.includes('time')) {
      result.sort((a, b) => {
        const timeA = a.timeline[0]?.time || 'TBD';
        const timeB = b.timeline[0]?.time || 'TBD';
        return timeA.localeCompare(timeB);
      });
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
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedFilters([]);
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
    handleBack,
    handleRideSelect,
    handleViewDetails,
    t,
    ft,
  };
};
