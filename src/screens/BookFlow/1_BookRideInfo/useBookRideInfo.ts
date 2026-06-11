import { useState, useCallback, useEffect } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { format, isBefore, startOfDay } from 'date-fns';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';
import { useBookRideStore, RecentSearch } from '@/store/useBookRideStore';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import rideService, { SearchRidePayload } from '@/serviceManager/rideService';
import { useTranslation } from '@/hooks/useTranslation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';
import { storage } from '@/utils/storage';

export const useBookRideInfo = () => {
  const { navigation, navigate } = useAppNavigation();
  const { bookRideInfo: t } = useLocale();
  const { t: translate } = useTranslation();
  const [isSearching, setIsSearching] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsSearching(false);
      checkUnratedRides();
      let backPressCount = 0;
      const onBackPress = () => {
        if (backPressCount === 0) {
          backPressCount++;
          ToastAndroid.show(
            'Press back again to exit the app',
            ToastAndroid.SHORT,
          );
          setTimeout(() => {
            backPressCount = 0;
          }, 2000);
          return true;
        } else {
          BackHandler.exitApp();
          return true;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => {
        subscription.remove();
      };
    }, [checkUnratedRides]),
  );

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
    const {
      startLocation: curStart,
      destinationLocation: curDest,
      travelDate: curDate,
      seatCount: curSeats,
      addRecentSearch,
      setSearchResults,
      rideType: curType,
    } = store;

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
        const ridesList =
          results?.rides ||
          results?.data ||
          (Array.isArray(results) ? results : []);
        setSearchResults(ridesList);

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
          getErrorMessage(error, translate('notification.defaultErrorMessage')),
        );
        setIsSearching(false);
      }
    }
  }, [navigate]);

  const handleSelectRecentSearch = useCallback(
    async (search: RecentSearch) => {
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
          const ridesList =
            results?.rides ||
            results?.data ||
            (Array.isArray(results) ? results : []);
          store.setSearchResults(ridesList);

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
            getErrorMessage(
              error,
              translate('notification.defaultErrorMessage'),
            ),
          );
          setIsSearching(false);
        }
      }
    },
    [navigate],
  );

  const handleSetRideType = useCallback((type: 'local' | 'intercity') => {
    useBookRideStore.getState().setRideType(type);
  }, []);

  const handleClearRecentSearches = useCallback(() => {
    useBookRideStore.getState().clearRecentSearches();
  }, []);

  const [ratingPromptRide, setRatingPromptRide] = useState<any>(null);
  const [isRatingPromptVisible, setIsRatingPromptVisible] = useState(false);

  const checkUnratedRides = useCallback(async () => {
    try {
      // Fetch archived/past rides
      const response = await rideService.getMyRides(2, 0, 10);
      let rideList: any[] = [];
      if (Array.isArray(response)) rideList = response;
      else if (response?.rides && Array.isArray(response.rides))
        rideList = response.rides;
      else if (response?.data && Array.isArray(response.data))
        rideList = response.data;
      else if (response?.content && Array.isArray(response.content))
        rideList = response.content;

      // Find completed rides
      const completedRides = rideList.filter(
        (r: any) => r.rideStatus === 'COMPLETED' || r.status === 'COMPLETED',
      );

      if (completedRides.length === 0) return;

      // Get already rated/dismissed ride IDs from MMKV
      const ratedStr = storage.getString('rated_rides') || '[]';
      const ratedIds = JSON.parse(ratedStr);

      // Find first unrated completed ride
      const unrated = completedRides.find((r: any) => !ratedIds.includes(r.id));
      if (unrated) {
        setRatingPromptRide(unrated);
        setIsRatingPromptVisible(true);
      }
    } catch (error) {
      console.error('[RatingCheck] Failed to check unrated rides:', error);
    }
  }, []);

  const handleConfirmRating = useCallback(() => {
    if (!ratingPromptRide) return;

    // Save as rated/dismissed so we don't prompt again
    const ratedStr = storage.getString('rated_rides') || '[]';
    const ratedIds = JSON.parse(ratedStr);
    ratedIds.push(ratingPromptRide.id);
    storage.set('rated_rides', JSON.stringify(ratedIds));
    setIsRatingPromptVisible(false);

    // Navigate based on role
    const isUserDriver = ratingPromptRide.role === 'DRIVER';
    if (isUserDriver) {
      // Driver rates passenger(s) on RideDetails
      (navigation.navigate as any)('RideDetails', {
        rideId: ratingPromptRide.id,
        status: 'COMPLETED',
      });
    } else {
      // Passenger rates driver on RatingScreen
      (navigation.navigate as any)('Rating', {
        rideId: ratingPromptRide.id,
        targetUserId:
          ratingPromptRide.driver?.driverId ||
          ratingPromptRide.driver?.userId ||
          'driver-1',
        targetUserName: ratingPromptRide.driver?.name || 'Driver',
        targetUserRole: 'DRIVER',
      });
    }
  }, [navigation, ratingPromptRide]);

  const handleDismissRating = useCallback(() => {
    if (!ratingPromptRide) return;
    const ratedStr = storage.getString('rated_rides') || '[]';
    const ratedIds = JSON.parse(ratedStr);
    ratedIds.push(ratingPromptRide.id);
    storage.set('rated_rides', JSON.stringify(ratedIds));
    setIsRatingPromptVisible(false);
  }, [ratingPromptRide]);

  return {
    pickup: startLocation?.address || '',
    destination: destinationLocation?.address || '',
    travelDate: travelDate ? new Date(travelDate) : new Date(),
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
    ratingPromptRide,
    isRatingPromptVisible,
    handleConfirmRating,
    handleDismissRating,
  };
};
