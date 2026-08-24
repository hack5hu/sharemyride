import { useState, useCallback, useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { format, isBefore, startOfDay } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';
import { useBookRideStore, RecentSearch } from '@/store/useBookRideStore';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { RideService, SearchRidePayload } from '@/serviceManager/RideService';
import { useTranslation } from '@/hooks/useTranslation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';
import { storage } from '@/utils/storage';
import { AnalyticsService, AnalyticsEvent } from '@/serviceManager/AnalyticsService';

let globalSessionPrompted = false;

export const useBookRideInfo = () => {
  const { navigation, navigate } = useAppNavigation();
  const { bookRideInfo: t } = useLocale();
  const { t: translate } = useTranslation();
  const [isSearching, setIsSearching] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);

  const {
    startLocation,
    destinationLocation,
    travelDate,
    seatCount,
    searchRadiusKm,
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

  const handleIncrementRadius = useCallback(() => {
    const store = useBookRideStore.getState();
    const current = store.searchRadiusKm || 25;
    const next = Math.min(50, Math.floor(current / 5) * 5 + 5);
    store.setSearchRadiusKm(next);
  }, []);

  const handleDecrementRadius = useCallback(() => {
    const store = useBookRideStore.getState();
    const current = store.searchRadiusKm || 25;
    const prev = Math.ceil(current / 5) * 5 - 5;
    store.setSearchRadiusKm(prev <= 0 ? 1 : prev);
  }, []);

  const handleSetRadius = useCallback((radius: number) => {
    const store = useBookRideStore.getState();
    store.setSearchRadiusKm(radius);
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
        const radiusKm = store.searchRadiusKm || 25;
        const payload: SearchRidePayload = {
          sourceLat: curStart.latitude,
          sourceLon: curStart.longitude,
          destLat: curDest.latitude,
          destLon: curDest.longitude,
          travelDate: format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss"),
          requestedSeats: curSeats,
          radiusInMeters: radiusKm * 1000,
          page: 0,
          size: 15,
        };

        if (!curDate) {
          store.setTravelDate(format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss"));
        }

        addRecentSearch({
          startLocation: curStart,
          destinationLocation: curDest,
          travelDate: format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss"),
          seatCount: curSeats,
        });

        AnalyticsService.logEvent(AnalyticsEvent.SEARCH_RIDE, {
          source: curStart.address,
          destination: curDest.address,
          seat_count: curSeats,
        });

        const results = await RideService.searchRides(payload);
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
          const radiusKm = store.searchRadiusKm || 25;
          const payload: SearchRidePayload = {
            sourceLat: search.startLocation.latitude,
            sourceLon: search.startLocation.longitude,
            destLat: search.destinationLocation.latitude,
            destLon: search.destinationLocation.longitude,
            travelDate: format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss"),
            requestedSeats: search.seatCount,
            radiusInMeters: radiusKm * 1000,
            page: 0,
            size: 15,
          };

          const results = await RideService.searchRides(payload);
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
    // Only prompt once per app runtime session
    if (globalSessionPrompted) return;

    try {
      // Fetch archived/past rides
      const response = await RideService.getMyRides(2, 0, 10);
      let rideList: any[] = [];
      if (Array.isArray(response)) rideList = response;
      else if (response?.rides && Array.isArray(response.rides))
        rideList = response.rides;
      else if (response?.data && Array.isArray(response.data))
        rideList = response.data;
      else if (response?.content && Array.isArray(response.content))
        rideList = response.content;

      // Find completed rides (sorted by most recent)
      const completedRides = rideList.filter(
        (r: any) => r.rideStatus === 'COMPLETED' || r.status === 'COMPLETED',
      );

      if (completedRides.length === 0) return;

      // Only evaluate the MOST RECENT completed ride
      const latestRide = completedRides[0];
      const targetRideId =
        latestRide.rideId ||
        latestRide.bookingId ||
        latestRide.id ||
        latestRide._id;

      if (!targetRideId) return;

      // Get already rated/dismissed ride IDs from MMKV
      const dismissedStr = storage.getString('dismissed_ratings') || '[]';
      const dismissedIds: any[] = JSON.parse(dismissedStr);

      // If the latest completed ride has already been dismissed or rated, do not prompt
      const isLocallyDismissed = dismissedIds.some(
        id => String(id) === String(targetRideId),
      );
      if (isLocallyDismissed) {
        globalSessionPrompted = true;
        return;
      }

      // Check if API response indicates the latest ride is already rated or has no passengers
      const isDriver = latestRide.role === 'DRIVER';

      if (isDriver) {
        let passengers = latestRide.passengers;
        // If passengers list not present in summary, fetch detail to be 100% accurate
        if (!Array.isArray(passengers)) {
          try {
            const detail = await RideService.getMyRideDetail(targetRideId);
            passengers = detail?.passengers || [];
          } catch {
            passengers = [];
          }
        }

        const hasNoPassengers =
          !Array.isArray(passengers) ||
          passengers.length === 0 ||
          latestRide.bookedSeats === 0 ||
          latestRide.totalBookedSeats === 0;

        // If driver had 0 passengers or all passengers are already rated, do not prompt
        const allRated =
          Array.isArray(passengers) &&
          passengers.length > 0 &&
          passengers.every((p: any) => p.hasRated === true);

        if (hasNoPassengers || allRated || latestRide.hasRated === true) {
          if (!dismissedIds.some(id => String(id) === String(targetRideId))) {
            dismissedIds.push(String(targetRideId));
            storage.set('dismissed_ratings', JSON.stringify(dismissedIds));
          }
          globalSessionPrompted = true;
          return;
        }
      } else {
        const isPassengerRated =
          latestRide.hasRated === true ||
          latestRide.isRated === true ||
          latestRide.driver?.hasRated === true ||
          latestRide.myBooking?.hasRatedDriver === true;

        if (isPassengerRated) {
          if (!dismissedIds.some(id => String(id) === String(targetRideId))) {
            dismissedIds.push(String(targetRideId));
            storage.set('dismissed_ratings', JSON.stringify(dismissedIds));
          }
          globalSessionPrompted = true;
          return;
        }
      }

      globalSessionPrompted = true;
      setRatingPromptRide(latestRide);
      setIsRatingPromptVisible(true);
    } catch (error) {
      console.error('[RatingCheck] Failed to check unrated rides:', error);
    }
  }, []);

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

  const handleConfirmRating = useCallback(() => {
    globalSessionPrompted = true;
    if (!ratingPromptRide) return;

    const targetRideId =
      ratingPromptRide.rideId ||
      ratingPromptRide.bookingId ||
      ratingPromptRide.id ||
      ratingPromptRide._id;

    if (targetRideId) {
      const dismissedStr = storage.getString('dismissed_ratings') || '[]';
      const dismissedIds: any[] = JSON.parse(dismissedStr);
      const exists = dismissedIds.some(
        id => String(id) === String(targetRideId),
      );
      if (!exists) {
        dismissedIds.push(String(targetRideId));
        storage.set('dismissed_ratings', JSON.stringify(dismissedIds));
      }
    }

    setIsRatingPromptVisible(false);

    // Navigate based on role
    const isUserDriver = ratingPromptRide.role === 'DRIVER';
    if (isUserDriver) {
      // Driver rates passenger(s) on RideDetails
      (navigation.navigate as any)('RideDetails', {
        rideId: String(targetRideId),
        status: 'COMPLETED',
      });
    } else {
      // Passenger rates driver on RatingScreen
      (navigation.navigate as any)('Rating', {
        rideId: String(targetRideId),
        targetUserId:
          ratingPromptRide.driver?.driverId ||
          ratingPromptRide.driver?.userId ||
          ratingPromptRide.driverId ||
          ratingPromptRide.userId ||
          'driver-1',
        targetUserName: ratingPromptRide.driver?.name || 'Driver',
        targetUserRole: 'DRIVER',
      });
    }
  }, [navigation, ratingPromptRide]);

  const handleDismissRating = useCallback(() => {
    globalSessionPrompted = true;
    if (!ratingPromptRide) {
      setIsRatingPromptVisible(false);
      return;
    }
    const targetRideId =
      ratingPromptRide.rideId ||
      ratingPromptRide.bookingId ||
      ratingPromptRide.id ||
      ratingPromptRide._id;

    if (targetRideId) {
      const dismissedStr = storage.getString('dismissed_ratings') || '[]';
      const dismissedIds: any[] = JSON.parse(dismissedStr);
      const exists = dismissedIds.some(
        id => String(id) === String(targetRideId),
      );
      if (!exists) {
        dismissedIds.push(String(targetRideId));
        storage.set('dismissed_ratings', JSON.stringify(dismissedIds));
      }
    }
    setIsRatingPromptVisible(false);
  }, [ratingPromptRide]);

  return {
    pickup: startLocation?.address || '',
    destination: destinationLocation?.address || '',
    travelDate: travelDate ? new Date(travelDate) : new Date(),
    peopleCount: seatCount,
    radiusKm: searchRadiusKm,
    isSearching,
    isSwapped,
    recentSearches,
    handlePressPickup,
    handlePressDestination,
    handleSwapLocations,
    handleOpenDatePicker,
    incrementPeople,
    decrementPeople,
    handleIncrementRadius,
    handleDecrementRadius,
    handleSetRadius,
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
