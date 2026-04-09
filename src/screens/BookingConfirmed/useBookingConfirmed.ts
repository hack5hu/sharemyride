import { useCallback, useMemo } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Share } from 'react-native';
import { useLocale } from '@/constants/localization';
import { RootStackParamList } from '@/navigation/types.d';

export const useBookingConfirmed = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'BookingConfirmed'>>();
  const { bookingConfirmed: t } = useLocale();

  const rideId = route.params?.rideId;

  // Mock data for the success screen
  const rideData = useMemo(() => ({
    driver: {
      name: 'Alex Rivera',
      rating: 4.9,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvAi3VLLh0H1w2qd79uW3z-ps29Ls4vpbl8sv_RmENg6SBRooUNLmE1gvujDknFS04hMG-hSOBhNU50BkcOSlHVHc-mJQ83Y_mtCjBjQTIBUel8FHDe4RIQz1rM3uPz0AJSV3pX7Eqxr-ghOzIzDNFLMeBgv7Hq0s_CFM6BGXoqRCcQirUh4jFyCdOrZUZBr0cS8ZxARpS8EdZgzeMN8w6wg3i1GUWcTrvlNP7heg1GLkda8-BDUj0XGOUwLpssF9y8NiDowTd5Hly',
      isVerified: true,
      car: 'Toyota Prius (Green)',
      plate: 'KNT-429',
    },
    pickupTime: '10:45 AM',
    arrivalInMins: 12,
    seatNumber: 'Seat B2',
    seatPreference: t.windowPreference,
  }), [t.windowPreference]);

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
