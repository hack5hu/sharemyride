import { useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Clipboard, Linking, Platform } from 'react-native';
import { useLocale } from '@/constants/localization';
import { useBookRideStore } from '@/store/useBookRideStore';
import rideService from '@/serviceManager/rideService';
import { useRideDataMapper } from './useRideDataMapper';

export const useRideInformation = (rideId: string, sourceStopId?: number, destinationStopId?: number) => {
  const navigation = useNavigation();
  const { rideInformation: t } = useLocale();
  const [rideRaw, setRideRaw] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { startLocation, destinationLocation } = useBookRideStore();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const data = await rideService.getRideDetail(rideId, sourceStopId, destinationStopId);
        setRideRaw(data);
      } catch (error) {
        console.error('Failed to fetch ride detail:', error);
      } finally {
        // Subtle delay to ensure UI feels stable
        setTimeout(() => setIsLoading(false), 300);
      }
    };
    fetchDetail();
  }, [rideId]);
  
  const ride = useRideDataMapper(
    rideRaw, 
    startLocation, 
    destinationLocation, 
    sourceStopId, 
    destinationStopId
  );

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleBook = useCallback(() => {
    (navigation.navigate as any)('BookSeatSelection', { 
      rideId,
      sourceStopId,
      destinationStopId,
      seats: (ride as any)?.seats,
      passengers: (ride as any)?.passengers,
      vehicleType: (ride as any)?.vehicle?.type,
      departureDate: (ride as any)?.departureDate,
      departureTime: (ride as any)?.departureTime,
    });
  }, [navigation, rideId, sourceStopId, destinationStopId, ride]);

  const handleChat = useCallback(() => {
    (navigation.navigate as any)('ChatDetails', {
      userId: ride?.driver?.id,
      rideId: rideId,
      name: ride?.driver?.name,
      avatarUri: ride?.driver?.avatar,
      rideInfo: {
        pickup: ride?.timeline?.[0]?.location || '',
        dropoff: ride?.timeline?.[ride?.timeline.length - 1]?.location || '',
        date: ride?.departureDate || '',
        time: ride?.departureTime || '',
      },
    });
  }, [navigation, ride]);

  const handleViewRoute = useCallback((index?: number) => {
    const stops = ride?.rawStops;
    if (!stops || stops.length === 0) return;
    (navigation.navigate as any)('RideRouteMap', {
      routePath: ride?.routePath ?? '',
      stops,
      initialStopIndex: index,
    });
  }, [navigation, ride]);

  const handleCopyAddress = useCallback((address: string) => {
    Clipboard.setString(address);
  }, []);

  const handleExternalMapOpen = useCallback((lat?: number, lon?: number, label?: string) => {
    if (!lat || !lon) return;
    const url = Platform.select({
      ios: `maps:0,0?q=${label || 'Location'}@${lat},${lon}`,
      android: `geo:0,0?q=${lat},${lon}(${label || 'Location'})`,
    }) || `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open map application');
    });
  }, []);

  const handleDriverProfile = useCallback(() => {
    if (ride?.driver?.id) {
      (navigation.navigate as any)('UserProfileDetail', { userId: ride.driver.id });
    }
  }, [navigation, ride]);

  return {
    t,
    handleBack,
    handleBook,
    handleChat,
    handleDriverProfile,
    handleViewRoute,
    handleCopyAddress,
    handleExternalMapOpen,
    ride,
    isLoading,
  };
};
