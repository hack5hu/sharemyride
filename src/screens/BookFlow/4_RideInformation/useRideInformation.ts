import { useCallback, useState, useEffect } from 'react';
import { Alert, Clipboard, Linking, Platform } from 'react-native';
import { useLocale } from '@/constants/localization';
import { useBookRideStore } from '@/store/useBookRideStore';
import rideService from '@/serviceManager/rideService';
import { useRideDataMapper } from './useRideDataMapper';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';

export const useRideInformation = (rideId: string, sourceStopId?: number, destinationStopId?: number) => {
  const { navigate, goBack } = useAppNavigation();
  const { rideInformation: t } = useLocale();
  const locale = useLocale();
  const [rideRaw, setRideRaw] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const handleReportRide = useCallback(() => {
    setIsReportModalVisible(true);
  }, []);

  const handleReportSubmit = useCallback((_data: { categoryId: string; description: string }) => {
    setIsReportModalVisible(false);
    showNotification(
      NotificationType.SUCCESS,
      locale.rideDetails.reportSuccessTitle,
      locale.rideDetails.reportSuccessMessage
    );
  }, [locale]);

  const startLocation = useBookRideStore(state => state.startLocation);
  const destinationLocation = useBookRideStore(state => state.destinationLocation);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const data = await rideService.getRideDetail(rideId, sourceStopId, destinationStopId);
        setRideRaw(data);
      } catch (error: any) {
        console.error('Failed to fetch ride detail:', error);
        showNotification(
          NotificationType.ERROR,
          locale.notification.defaultErrorTitle,
          getErrorMessage(error, locale.notification.defaultErrorMessage)
        );
      } finally {
        setTimeout(() => setIsLoading(false), 300);
      }
    };
    fetchDetail();
  }, [rideId, sourceStopId, destinationStopId]);
  
  const ride = useRideDataMapper(
    rideRaw, 
    startLocation, 
    destinationLocation, 
    sourceStopId, 
    destinationStopId
  );

  const handleBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleBook = useCallback(() => {
    navigate('BookSeatSelection', { 
      rideId,
      sourceStopId,
      destinationStopId,
      seats: (ride as any)?.seats,
      passengers: (ride as any)?.passengers,
      vehicleType: (ride as any)?.vehicle?.type,
      departureDate: (ride as any)?.departureDate,
      departureTime: (ride as any)?.departureTime,
    });
  }, [navigate, rideId, sourceStopId, destinationStopId, ride]);

  const handleChat = useCallback(() => {
    navigate('ChatDetails', {
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
  }, [navigate, ride, rideId]);

  const handleViewRoute = useCallback((index?: number) => {
    const stops = ride?.rawStops;
    if (!stops || stops.length === 0) return;
    navigate('RideRouteMap', {
      routePath: ride?.routePath ?? '',
      stops,
      initialStopIndex: index,
      sourceStopId,
      destinationStopId,
      userSearchedPickup: startLocation ? {
        latitude: startLocation.latitude,
        longitude: startLocation.longitude,
        name: startLocation.name || startLocation.address || 'Pickup Point',
      } : undefined,
      userSearchedDropoff: destinationLocation ? {
        latitude: destinationLocation.latitude,
        longitude: destinationLocation.longitude,
        name: destinationLocation.name || destinationLocation.address || 'Dropoff Point',
      } : undefined,
    });
  }, [navigate, ride, sourceStopId, destinationStopId, startLocation, destinationLocation]);

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
      showNotification(
        NotificationType.ERROR,
        locale.notification.defaultErrorTitle,
        locale.notification.mapOpenError
      );
    });
  }, [locale]);

  const handleDriverProfile = useCallback(() => {
    if (ride?.driver?.id) {
      navigate('UserProfileDetail', { userId: ride?.driver?.id });
    }
  }, [navigate, ride]);

  const handlePassengerProfile = useCallback((id: string) => {
    navigate('UserProfileDetail', { userId: id });
  }, [navigate]);

  return {
    t,
    handleBack,
    handleBook,
    handleChat,
    handleDriverProfile,
    handlePassengerProfile,
    handleViewRoute,
    handleCopyAddress,
    handleExternalMapOpen,
    ride,
    isLoading,
    isReportModalVisible,
    setIsReportModalVisible,
    handleReportRide,
    handleReportSubmit,
  };
};
