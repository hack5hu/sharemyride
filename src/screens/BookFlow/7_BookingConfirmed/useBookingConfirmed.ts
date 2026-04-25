import { useCallback, useMemo, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { Share, BackHandler } from 'react-native';
import { useLocale } from '@/constants/localization';
import { RootStackParamList } from '@/navigation/types.d';
import { useBookRideStore } from '@/store/useBookRideStore';

export const useBookingConfirmed = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'BookingConfirmed'>>();
  const { bookingConfirmed: t } = useLocale();
  const { searchResults } = useBookRideStore();

  // Prevent hardware back button on Android
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Return true to stop default back behavior
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  const rideId = route.params?.rideId;
  const bookedSeats = route.params?.bookedSeats || [];

  const rideRaw = useMemo(
    () => searchResults?.find((r: any) => r.id === rideId),
    [searchResults, rideId],
  );

  const rideData = useMemo(() => {
    const firstStop = rideRaw?.stops?.[0];
    let pickupTime = 'TBD';
    if (firstStop?.arrivalTime) {
      pickupTime = new Date(firstStop.arrivalTime).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }

    return {
      driver: {
        name: rideRaw?.driverName || 'Driver',
        rating: 4.9,
        avatar: rideRaw?.driverPhotoUrl || 'https://ui-avatars.com/api/?name=' + (rideRaw?.driverName || 'D'),
        isVerified: true,
        car: rideRaw?.vehicleType?.replace('CAR_', '').replace('_', '-').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) || 'Vehicle',
        plate: rideRaw?.vehicleRegistration || '...',
      },
      pickupTime,
      arrivalInMins: 12, // Still mock or calculate if possible
      seatNumber: bookedSeats.length > 0 ? bookedSeats.join(', ') : 'TBD',
      seatPreference: t.windowPreference,
    };
  }, [rideRaw, bookedSeats, t.windowPreference]);

  const handleGoToMyRides = useCallback(() => {
    (navigation.navigate as any)('MyRides');
  }, [navigation]);

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
