import { useCallback, useEffect, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/store/useAuthStore';
import { RideDetailsScreenProps } from './types';
import rideService from '@/serviceManager/rideService';
import { mapBackendRideToUI } from '@/screens/BookFlow/4_RideInformation/useRideDataMapper';
import { useMyRidesStore } from '@/store/useMyRidesStore';

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

  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<{ type: 'RIDE' | 'BOOKING'; id: string | number; isSelf?: boolean } | null>(null);
  const [selectedReasonId, setSelectedReasonId] = useState<string | null>(null);
  const [otherReasonText, setOtherReasonText] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  const cancellationReasons = useMemo(() => [
    { id: 'change_plans', label: 'Plans changed' },
    { id: 'found_alternative', label: 'Found another ride' },
    { id: 'uncomfortable_pickup', label: 'Not comfortable with pickup point' },
    { id: 'not_available', label: 'Vehicle not available' },
    { id: 'other', label: 'Other' },
  ], []);

  const handleOpenCancelModal = useCallback((type: 'RIDE' | 'BOOKING', id: string | number, isSelf: boolean = false) => {
    setCancelTarget({ type, id, isSelf });
    setIsCancelModalVisible(true);
  }, []);

  const handleConfirmCancel = useCallback(async () => {
    if (!cancelTarget || !selectedReasonId) return;

    const reason = selectedReasonId === 'other'
      ? otherReasonText
      : cancellationReasons.find(r => r.id === selectedReasonId)?.label || '';

    const bookingId = cancelTarget.id || rideData?.myBookingId;
    console.log(bookingId);
    setIsCancelling(true);
    try {
      if (cancelTarget.type === 'RIDE') {
        await rideService.cancelRide(bookingId, reason);
        const { removeRide } = useMyRidesStore.getState();
        removeRide('UPCOMING', rideId);
        navigation.goBack();
      } else {
        await rideService.cancelBooking(bookingId, reason);
        if (cancelTarget.isSelf) {
          // Manually remove from store for instant feedback
          const { removeRide } = useMyRidesStore.getState();
          removeRide('UPCOMING', bookingId);
          navigation.goBack();
        } else {
          fetchDetails();
        }
      }
      setIsCancelModalVisible(false);
      setSelectedReasonId(null);
      setOtherReasonText('');
      Alert.alert('Success', 'Cancellation successful.');
    } catch (error) {
      Alert.alert('Error', 'Cancellation failed.');
    } finally {
      setIsCancelling(false);
    }
  }, [cancelTarget, selectedReasonId, otherReasonText, cancellationReasons, rideData, fetchDetails, navigation]);

  const handleCancelRide = useCallback(() => {
    handleOpenCancelModal('RIDE', rideId, true);
  }, [rideId, handleOpenCancelModal]);

  const handleCancelPassenger = useCallback((bookingId: string) => {
    handleOpenCancelModal('BOOKING', bookingId, false);
  }, [handleOpenCancelModal]);

  const handleCancelOwnBooking = useCallback(() => {
    handleOpenCancelModal('BOOKING', rideData?.myBookingId || 0, true);
  }, [rideData, handleOpenCancelModal]);

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
    handleCancelOwnBooking,
    // Modal Props
    isCancelModalVisible,
    setIsCancelModalVisible,
    selectedReasonId,
    setSelectedReasonId,
    otherReasonText,
    setOtherReasonText,
    cancellationReasons,
    handleConfirmCancel,
    isCancelling,
  };
};
