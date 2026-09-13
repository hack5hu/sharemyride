import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { type PublishDraft } from '@/store/types/publish';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { formatDisplayAddress } from '@/utils/address';
import { restorePublishDraft } from '@/utils/publishDraft';
import { storage } from '@/utils/storage';

export const useLocationSelection = () => {
  const navigation = useAppNavigation();

  const { startLocation, destinationLocation, clearPublishState } =
    useRidePublishStore();

  const [recentRides, setRecentRides] = useState<PublishDraft[]>([]);

  useEffect(() => {
    return () => {
      clearPublishState();
    };
  }, [clearPublishState]);

  useEffect(() => {
    try {
      const raw = storage.getString('recent_published_rides');
      if (raw) {
        setRecentRides(JSON.parse(raw));
      }
    } catch {
      // Recent rides are optional
    }
  }, []);

  const handleSwapLocations = useCallback(() => {
    Keyboard.dismiss();
    if (!startLocation && !destinationLocation) return;
    useRidePublishStore.setState({
      startLocation: destinationLocation,
      destinationLocation: startLocation,
      routeDetails: null,
      selectedRoute: null,
      price: 0,
      fullJourneyPrice: 0,
      frontSeatPrice: 0,
      segmentPrices: {},
    });
  }, [startLocation, destinationLocation]);

  const handlePressStart = useCallback(() => {
    Keyboard.dismiss();
    navigation.push('MapPicker', {
      type: 'start',
      returnTo: 'LocationSelection',
      module: 'publish',
    });
  }, [navigation]);

  const handlePressDestination = useCallback(() => {
    Keyboard.dismiss();
    navigation.push('MapPicker', {
      type: 'destination',
      returnTo: 'LocationSelection',
      module: 'publish',
    });
  }, [navigation]);

  const handleContinue = useCallback(() => {
    Keyboard.dismiss();
    if (startLocation && destinationLocation) {
      navigation.navigate('RouteSelection');
    }
  }, [navigation, startLocation, destinationLocation]);

  const handleSelectRecentRide = useCallback(
    (ride: PublishDraft) => {
      Keyboard.dismiss();
      restorePublishDraft({
        ...ride,
        departureDate: null,
        departureDates: [],
        departureTime: null,
      });
      navigation.navigate('RouteSelection');
    },
    [navigation],
  );

  const canContinue = !!startLocation && !!destinationLocation;

  return {
    startLocationName: formatDisplayAddress(startLocation?.address),
    destinationLocationName: formatDisplayAddress(destinationLocation?.address),
    handlePressStart,
    handlePressDestination,
    handleSwapLocations,
    handleContinue,
    canContinue,
    recentRides,
    handleSelectRecentRide,
  };
};
