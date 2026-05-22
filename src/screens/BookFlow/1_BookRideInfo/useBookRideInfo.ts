import { useState, useCallback, useEffect } from 'react';
import { format, isBefore, startOfDay } from 'date-fns';
import { useRoute } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';
import { useBookRideStore, RecentSearch } from '@/store/useBookRideStore';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import rideService, { SearchRidePayload } from '@/serviceManager/rideService';
import { useTranslation } from '@/hooks/useTranslation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';

export const useBookRideInfo = () => {
  const { navigation, navigate } = useAppNavigation();
  const route = useRoute();
  const { bookRideInfo: t } = useLocale();
  const { t: translate } = useTranslation();
  const [isSearching, setIsSearching] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);

  const {
    startLocation,
    destinationLocation,
    travelDate,
    seatCount,
    recentSearches,
    rideType,
  } = useBookRideStore();

  const handlePressPickup = useCallback(() => {
    navigate('MapPicker', {
      type: 'start',
      module: 'search',
      returnTo: 'BookRideInfo',
    });
  }, [navigate]);

  const handlePressDestination = useCallback(() => {
    navigate('MapPicker', {
      type: 'destination',
      module: 'search',
      returnTo: 'BookRideInfo',
    });
  }, [navigate]);

  const handleSwapLocations = useCallback(() => {
    setIsSwapped(prev => !prev);
    const store = useBookRideStore.getState();
    const currentStart = store.startLocation;
    const currentDest = store.destinationLocation;
    
    store.setStartLocation(currentDest);
    store.setDestinationLocation(currentStart);
  }, []);

  useEffect(() => {
    const params = route.params as any;
    if (params?.updatedLocation && params?.type) {
      const store = useBookRideStore.getState();
      if (params.type === 'start') {
        store.setStartLocation(params.updatedLocation);
      } else if (params.type === 'destination') {
        store.setDestinationLocation(params.updatedLocation);
      }
      // Reset params so they aren't processed again on re-focus
      navigation.setParams({
        updatedLocation: undefined,
        type: undefined,
      } as any);
    }
  }, [route.params, navigation]);

  const handleOpenDatePicker = useCallback(() => {
    navigate('BookDateSelection');
  }, [navigate]);

  const incrementPeople = useCallback(() => {
    const store = useBookRideStore.getState();
    store.setSeatCount(Math.min(store.seatCount + 1, 6));
  }, []);
  
  const decrementPeople = useCallback(() => {
    const store = useBookRideStore.getState();
    store.setSeatCount(Math.max(store.seatCount - 1, 1));
  }, []);

  const handleSearchRides = useCallback(async () => {
    const store = useBookRideStore.getState();
    const { startLocation: curStart, destinationLocation: curDest, travelDate: curDate, seatCount: curSeats, addRecentSearch, setSearchResults, rideType: curType } = store;

    if (curStart && curDest) {
      const selectedDate = curDate ? new Date(curDate) : new Date();
      if (isBefore(selectedDate, startOfDay(new Date()))) {
        store.setTravelDate(null);
        navigate('BookDateSelection');
        return;
      }

      try {
        setIsSearching(true);
        const payload: SearchRidePayload = {
          sourceLat: curStart.latitude,
          sourceLon: curStart.longitude,
          destLat: curDest.latitude,
          destLon: curDest.longitude,
          travelDate: format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss"),
          requestedSeats: curSeats,
          radiusInMeters: 10000,
          page: 0,
          size: 15,
        };

        addRecentSearch({
          startLocation: curStart,
          destinationLocation: curDest,
          travelDate: format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss"),
          seatCount: curSeats,
        });

        const results = await rideService.searchRides(payload);
        setSearchResults(results.rides || results.data || results);
        
        if (curType === 'local') {
          navigate('LocalRideResults');
        } else {
          navigate('AvailableRides');
        }
      } catch (error: any) {
        console.error('Failed to search rides:', error);
        showNotification(
          NotificationType.ERROR,
          translate('notification.defaultErrorTitle'),
          error.message || translate('notification.defaultErrorMessage')
        );
      } finally {
        setIsSearching(false);
      }
    }
  }, [navigate]);

  const handleSelectRecentSearch = useCallback(async (search: RecentSearch) => {
    const store = useBookRideStore.getState();
    store.setStartLocation(search.startLocation);
    store.setDestinationLocation(search.destinationLocation);
    store.setTravelDate(search.travelDate);
    store.setSeatCount(search.seatCount);
    
    const selectedDate = new Date(search.travelDate);
    if (isBefore(selectedDate, startOfDay(new Date()))) {
      store.setTravelDate(null);
      navigate('BookDateSelection');
    } else {
      try {
        setIsSearching(true);
        const payload: SearchRidePayload = {
          sourceLat: search.startLocation.latitude,
          sourceLon: search.startLocation.longitude,
          destLat: search.destinationLocation.latitude,
          destLon: search.destinationLocation.longitude,
          travelDate: format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss"),
          requestedSeats: search.seatCount,
          radiusInMeters: 10000,
          page: 0,
          size: 15,
        };

        const results = await rideService.searchRides(payload);
        store.setSearchResults(results.rides || results.data || results);
        
        if (store.rideType === 'local') {
          navigate('LocalRideResults');
        } else {
          navigate('AvailableRides');
        }
      } catch (error: any) {
        console.error('Failed to search rides from recent search:', error);
        showNotification(
          NotificationType.ERROR,
          translate('notification.defaultErrorTitle'),
          error.message || translate('notification.defaultErrorMessage')
        );
      } finally {
        setIsSearching(false);
      }
    }
  }, [navigate]);

  const handleSetRideType = useCallback((type: 'local' | 'intercity') => {
    useBookRideStore.getState().setRideType(type);
  }, []);

  const handleClearRecentSearches = useCallback(() => {
    useBookRideStore.getState().clearRecentSearches();
  }, []);

  return {
    pickup: startLocation?.address || '',
    destination: destinationLocation?.address || '',
    travelDate: travelDate ? new Date(travelDate) : null,
    peopleCount: seatCount,
    isSearching,
    isSwapped,
    recentSearches,
    handlePressPickup,
    handlePressDestination,
    handleSwapLocations,
    handleOpenDatePicker,
    incrementPeople,
    decrementPeople,
    handleSearchRides,
    handleSelectRecentSearch,
    clearRecentSearches: handleClearRecentSearches,
    t,
    rideType,
    setRideType: handleSetRideType,
  };
};
