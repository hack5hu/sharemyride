import { useCallback, useEffect, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/store/useAuthStore';
import { RideDetailsScreenProps } from './types';
import rideService from '@/serviceManager/rideService';
import { mapBackendRideToUI } from '@/screens/BookFlow/4_RideInformation/useRideDataMapper';

export const useRideDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<RideDetailsScreenProps['route']>();
  const { rideId, sourceStopId, destinationStopId } = route.params;
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [rideData, setRideData] = useState<any>(null);

  const fetchDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await rideService.getRideDetail(rideId, sourceStopId, destinationStopId);
      
      // Use IDs from myBooking if route params are empty
      const resolvedSourceId = sourceStopId || data?.myBooking?.sourceStopId;
      const resolvedDestId = destinationStopId || data?.myBooking?.destinationStopId;
      
      const mapped = mapBackendRideToUI(data, undefined, undefined, resolvedSourceId, resolvedDestId);
      setRideData(mapped);
    } catch (error) {
      console.error('Fetching ride details failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [rideId, sourceStopId, destinationStopId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleBook = useCallback(() => {
    // Already booked or viewing history, maybe navigate to booking flow if needed?
    // For now, let's just keep it consistent with RideInformation if it's a passenger
  }, []);

  const isDriver = useMemo(() => {
    return rideData?.userRole === 'DRIVER';
  }, [rideData]);

  const handleCancelRide = useCallback(() => {
    Alert.alert(
      t('rideDetails.cancelRideAlertTitle'),
      t('rideDetails.cancelRideAlertMsg'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('common.confirm'), 
          style: 'destructive',
          onPress: async () => {
            try {
              await rideService.cancelRide(rideId);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel ride.');
            }
          }
        }
      ]
    );
  }, [rideId, navigation, t]);

  const handleCancelPassenger = useCallback((passengerId: string) => {
    Alert.alert(
      'Cancel Passenger',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes, Cancel', 
          style: 'destructive',
          onPress: async () => {
            try {
              // await rideService.cancelPassenger(rideId, passengerId);
              // fetchDetails();
              Alert.alert('Success', 'Booking cancelled.');
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel booking.');
            }
          }
        }
      ]
    );
  }, [rideId]);

  const handleDriverProfile = useCallback(() => {
    // Navigate to driver profile
  }, []);

  const handleChat = useCallback(() => {
    const targetName = isDriver ? 'Passengers' : (rideData?.driver?.name || 'Driver');
    navigation.navigate('ChatDetails', { 
      chatId: rideId,
      name: targetName 
    });
  }, [navigation, rideId, rideData, isDriver]);

  const handleViewRoute = useCallback((index: number) => {
    const point = rideData?.timeline?.[index];
    if (point) {
      Alert.alert('Opening Map', `Navigating to: ${point.location}`);
    }
  }, [rideData]);

  const handleCopyAddress = useCallback((address: string) => {
    // In a real app, use Clipboard.setString(address)
    Alert.alert('Address Copied', address);
  }, []);

  return {
    ride: rideData,
    isLoading,
    isDriver,
    t: useMemo(() => ({
      title: t('rideDetails.headerTitle'),
      timelineTitle: t('rideDetails.timelineTitle'),
    }), [t]),
    handleBack,
    handleBook,
    handleViewRoute,
    handleCopyAddress,
    handleDriverProfile,
    handleChat,
    handleCancelRide,
    handleCancelPassenger,
  };
};
