import { useState, useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';
import { useBookRideStore } from '@/store/useBookRideStore';
import rideService, { SearchRidePayload } from '@/serviceManager/rideService';

export const useBookRideInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookRideInfo: t } = useLocale();
  const [isSearching, setIsSearching] = useState(false);

  const {
    startLocation,
    setStartLocation,
    destinationLocation,
    setDestinationLocation,
    travelDate,
    seatCount,
    setSeatCount,
    setSearchResults,
  } = useBookRideStore();

  const handlePressPickup = useCallback(() => {
    navigation.navigate('MapPicker' as any, {
      type: 'start',
      module: 'book',
      returnTo: 'BookRideInfo',
    });
  }, [navigation]);

  const handlePressDestination = useCallback(() => {
    navigation.navigate('MapPicker' as any, {
      type: 'destination',
      module: 'book',
      returnTo: 'BookRideInfo',
    });
  }, [navigation]);

  useEffect(() => {
    const params = route.params as any;
    if (params?.updatedLocation && params?.type) {
      if (params.type === 'start') {
        setStartLocation(params.updatedLocation);
      } else if (params.type === 'destination') {
        setDestinationLocation(params.updatedLocation);
      }
      // Reset params so they aren't processed again on re-focus
      navigation.setParams({
        updatedLocation: undefined,
        type: undefined,
      } as any);
    }
  }, [route.params, navigation, setStartLocation, setDestinationLocation]);

  const handleOpenDatePicker = useCallback(() => {
    navigation.navigate('BookDateSelection' as any);
  }, [navigation]);

  const incrementPeople = useCallback(
    () => setSeatCount(Math.min(seatCount + 1, 8)),
    [seatCount, setSeatCount]
  );
  
  const decrementPeople = useCallback(
    () => setSeatCount(Math.max(seatCount - 1, 1)),
    [seatCount, setSeatCount]
  );

  const handleSearchRides = useCallback(async () => {
    if (startLocation && destinationLocation) {
      try {
        setIsSearching(true);
        const payload: SearchRidePayload = {
          sourceLat: startLocation.latitude,
          sourceLon: startLocation.longitude,
          destLat: destinationLocation.latitude,
          destLon: destinationLocation.longitude,
          travelDate: travelDate ? travelDate.replace('Z', '') : new Date().toISOString().replace('Z', ''),
          requestedSeats: seatCount,
          radiusInMeters: 10000,
        };
        const results = await rideService.searchRides(payload);
        setSearchResults(results.data || results);
        navigation.navigate('AvailableRides' as any);
      } catch (error) {
        console.error('Failed to search rides:', error);
        setSearchResults([]);
        navigation.navigate('AvailableRides' as any);
      } finally {
        setIsSearching(false);
      }
    }
  }, [navigation, startLocation, destinationLocation, travelDate, seatCount, setSearchResults]);

  return {
    pickup: startLocation?.name || '',
    destination: destinationLocation?.name || '',
    travelDate: travelDate ? new Date(travelDate) : new Date(),
    peopleCount: seatCount,
    isSearching,
    handlePressPickup,
    handlePressDestination,
    handleOpenDatePicker,
    incrementPeople,
    decrementPeople,
    handleSearchRides,
    t,
  };
};
