import { useCallback, useEffect, useMemo } from 'react';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { Share, BackHandler } from 'react-native';
import { useLocale } from '@/constants/localization';
import { RootStackParamList } from '@/navigation/types';
import { useBookRideStore } from '@/store/useBookRideStore';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { RouteStop } from '@/serviceManager/rideService';
import { formatTimeSafely } from '@/utils/date';

export const useBookingConfirmed = () => {
  const { navigate } = useAppNavigation();
  const navigation = useAppNavigation();

  useEffect(() => {
    navigation.setOptions({ headerLeft: () => null });
  }, [navigation]);
  const route = useRoute<RouteProp<RootStackParamList, 'BookingConfirmed'>>();
  const { bookingConfirmed: t } = useLocale();
  const searchResults = useBookRideStore(state => state.searchResults);

  // Prevent hardware back button on Android
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Return true to stop default back behavior
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  const rideId = route.params?.rideId;
  const bookedSeats = route.params?.bookedSeats || [];

  const rideRaw = useMemo(
    () =>
      searchResults?.find(
        (r: {
          id: string;
          stops?: RouteStop[];
          driverName?: string;
          driverPhotoUrl?: string;
          vehicleType?: string;
          vehicleRegistration?: string;
        }) => r.id === rideId,
      ),
    [searchResults, rideId],
  );

  const rideData = useMemo(() => {
    const firstStop = rideRaw?.stops?.[0];
    const pickupTime =
      route.params?.pickupTime ||
      formatTimeSafely(firstStop?.arrivalTime, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

    const vehicleType = route.params?.vehicleType || rideRaw?.vehicleType;
    const departureDate =
      route.params?.departureDate ||
      (firstStop?.arrivalTime
        ? new Date(firstStop.arrivalTime).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
          })
        : '');

    const getSeatDescription = (
      seatId: string | number,
      vType?: string,
    ): string => {
      const id = String(seatId);
      const typeStr = (vType || '').toUpperCase();
      const is7Seater = typeStr.includes('7') || typeStr === '7';

      if (id === '1' || id === 'driver') return t.seatPositions.driver;
      if (id === '2') return t.seatPositions.frontPassenger;

      if (is7Seater) {
        switch (id) {
          case '3':
            return t.seatPositions.middleLeft;
          case '4':
            return t.seatPositions.middleCenter;
          case '5':
            return t.seatPositions.middleRight;
          case '6':
            return t.seatPositions.backLeft;
          case '7':
            return t.seatPositions.backRight;
        }
      } else {
        // 5 Seater or default
        switch (id) {
          case '3':
            return t.seatPositions.backLeft;
          case '4':
            return t.seatPositions.backCenter;
          case '5':
            return t.seatPositions.backRight;
        }
      }

      return t.seatPositions.defaultSeat.replace('{id}', id);
    };

    const formattedSeats =
      bookedSeats.length > 0
        ? bookedSeats
            .map(seatId => getSeatDescription(seatId, vehicleType))
            .join(', ')
        : 'TBD';

    return {
      driver: {
        name: rideRaw?.driverName || 'Host',
        rating: 4.9,
        avatar:
          rideRaw?.driverPhotoUrl ||
          'https://ui-avatars.com/api/?name=' + (rideRaw?.driverName || 'H'),
        isVerified: true,
        car:
          vehicleType
            ?.replace('CAR_', '')
            .replace('_', '-')
            .toLowerCase()
            .replace(/\b\w/g, (c: string) => c.toUpperCase()) || 'Vehicle',
        plate: rideRaw?.vehicleRegistration || '...',
      },
      pickupTime,
      arrivalInMins: 12, // Still mock or calculate if possible
      seatNumber: formattedSeats,
      seatPreference: t.windowPreference,
      departureDate,
    };
  }, [rideRaw, bookedSeats, route.params, t]);

  const handleGoToMyRides = useCallback(() => {
    navigate('MyRides');
  }, [navigate]);

  const handleShareDetails = useCallback(async () => {
    try {
      await Share.share({
        message: `My ride with ${rideData.driver.name} is confirmed for ${rideData.pickupTime}. Plate: ${rideData.driver.plate}`,
      });
    } catch (error) {
      console.error('Error sharing details:', error);
    }
  }, [rideData]);

  const handleMenuPress = useCallback(() => {
    // Placeholder for menu toggle
  }, []);

  return {
    t,
    rideData,
    handleGoToMyRides,
    handleShareDetails,
    handleMenuPress,
  };
};
