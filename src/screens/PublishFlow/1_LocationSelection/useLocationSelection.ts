import { type StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { useLocale } from '@/constants/localization';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { type RootStackParamList } from '@/navigation/types';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { formatDisplayAddress } from '@/utils/address';
import { calculateDistance } from '@/utils/location';
import { storage } from '@/utils/storage';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'LocationSelection'
>;

export const useLocationSelection = () => {
  const navigation = useAppNavigation();
  const { locationSelection: t } = useLocale();

  const { startLocation, destinationLocation, clearPublishState } =
    useRidePublishStore();

  const [recentRides, setRecentRides] = useState<any[]>([]);

  // Clear state when the publish flow is completely exited
  useEffect(() => {
    return () => {
      clearPublishState();
    };
  }, [clearPublishState]);

  // Load recent published rides from MMKV
  useEffect(() => {
    try {
      const raw = storage.getString('recent_published_rides');
      if (raw) {
        setRecentRides(JSON.parse(raw));
      }
    } catch (err) {
      console.error('[MMKV] Failed to load recent rides:', err);
    }
  }, []);

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
      const distance = calculateDistance(
        startLocation.latitude,
        startLocation.longitude,
        destinationLocation.latitude,
        destinationLocation.longitude,
      );
      if (distance < 5) {
        showNotification(
          NotificationType.ERROR,
          t.minDistanceErrorTitle,
          t.minDistanceError,
        );

        return;
      }
    }
    navigation.navigate('RouteSelection');
  }, [navigation, startLocation, destinationLocation, t]);

  const handleSelectRecentRide = useCallback(
    (ride: any) => {
      Keyboard.dismiss();
      useRidePublishStore.setState({
        startLocation: ride.startLocation,
        destinationLocation: ride.destinationLocation,
        middleStops: ride.middleStops || [],
        routeDetails: ride.routeDetails,
        selectedRoute: ride.selectedRoute,
        seatCount: ride.seatCount || 1,
        selectedSeatIds: ride.selectedSeatIds || [],
        vehicleId: ride.vehicleId,
        publishVehicleType: ride.publishVehicleType || '5',
        vehicleDetails: ride.vehicleDetails,
        preferences: ride.preferences,
        price: ride.price || 0,
        fullJourneyPrice: ride.fullJourneyPrice || 0,
        frontSeatPrice: ride.frontSeatPrice || 0,
        premiumEnabled:
          ride.premiumEnabled !== undefined ? ride.premiumEnabled : true,
        premiumPercentage: ride.premiumPercentage || 10,
        segmentPrices: ride.segmentPrices || {},
        requestType: ride.requestType || 'instant',
        departureDate: null,
        departureTime: null,
      });

      (navigation.navigate as any)('DateSelection', {
        returnTo: 'SummaryPublish',
      });
    },
    [navigation],
  );

  // Enforce validation: Must have both start and destination to proceed
  const canContinue = !!startLocation && !!destinationLocation;

  return {
    startLocationName: formatDisplayAddress(startLocation?.address),
    destinationLocationName: formatDisplayAddress(destinationLocation?.address),
    handlePressStart,
    handlePressDestination,
    handleContinue,
    canContinue,
    recentRides,
    handleSelectRecentRide,
  };
};
