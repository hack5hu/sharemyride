import { useCallback, useEffect, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/store/useAuthStore';
import { RideDetailsScreenProps } from './types';
import rideService from '@/serviceManager/rideService';
import { mapBackendRideToUI } from '@/screens/BookFlow/4_RideInformation/useRideDataMapper';
import { useMyRidesStore } from '@/store/useMyRidesStore';
import { Logger } from '@/utils/logger';

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
      
      const resolvedSourceId = sourceStopId || data?.myBooking?.sourceStopId;
      const resolvedDestId = destinationStopId || data?.myBooking?.destinationStopId;
      
      const mapped = mapBackendRideToUI(data, undefined, undefined, resolvedSourceId, resolvedDestId);
      
      // Merge with navigation params if fields are missing in detail response
      if (mapped && !mapped.status && route.params.status) {
        mapped.status = route.params.status;
      }
      if (mapped && !mapped.cancellationReason && route.params.cancellationReason) {
        mapped.cancellationReason = route.params.cancellationReason;
      }
      
      setRideData(mapped);
    } catch (error) {
      Logger.error('Fetching ride details failed:', error);
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
    // Placeholder for future booking logic if needed
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
    { id: 'change_plans', label: t('cancelRide.reasonPlansChanged') },
    { id: 'found_alternative', label: t('cancelRide.reasonAlternative') },
    { id: 'uncomfortable_pickup', label: t('cancelRide.reasonUncomfortable') },
    { id: 'not_available', label: t('cancelRide.reasonNotAvailable') },
    { id: 'other', label: t('cancelRide.reasonOther') },
  ], [t]);

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
      Alert.alert(t('common.success'), t('cancelRide.successMessage'));
    } catch (error) {
      Alert.alert(t('common.error'), t('cancelRide.errorMessage'));
    } finally {
      setIsCancelling(false);
    }
  }, [cancelTarget, selectedReasonId, otherReasonText, cancellationReasons, rideData, fetchDetails, navigation, rideId, t]);

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
    // Navigation to driver profile would go here
  }, []);

  const handleChat = useCallback(() => {
    const targetName = isDriver ? t('rideDetails.passengers') : (rideData?.driver?.name || t('rideDetails.driver'));
    navigation.navigate('ChatDetails' as any, { 
      chatId: rideId,
      name: targetName 
    });
  }, [navigation, rideId, rideData, isDriver, t]);

  const handleViewRoute = useCallback((index: number) => {
    const point = rideData?.timeline?.[index];
    if (point) {
      Alert.alert(t('common.openingMap'), `${t('common.navigatingTo')}: ${point.location}`);
    }
  }, [rideData, t]);

  const handleCopyAddress = useCallback((address: string) => {
    Alert.alert(t('common.addressCopied'), address);
  }, [t]);

  return {
    ride: rideData,
    isLoading,
    isDriver,
    t: useMemo(() => ({
      title: t('rideDetails.headerTitle'),
      timelineTitle: t('rideDetails.timelineTitle'),
      loaderMessage: t('rideDetails.fetchingDetails'),
      today: t('common.today'),
      ridesLabel: t('rideDetails.ridesLabel'),
      bookingTotal: t('rideDetails.bookingTotal'),
      seatsLabel: t('rideDetails.seatsLabel'),
      seatLabel: t('rideDetails.seatLabel'),
      paymentLabel: t('rideDetails.paymentLabel'),
      cashLabel: t('rideDetails.cashLabel'),
      cancelRide: t('rideDetails.cancelRide'),
      selectSeat: t('rideDetails.selectSeat'),
      cancelBooking: t('rideDetails.cancelBooking'),
      passengers: t('rideDetails.passengers'),
      driver: t('rideDetails.driver'),
      openingMap: t('common.openingMap'),
      navigatingTo: t('common.navigatingTo'),
      addressCopied: t('common.addressCopied'),
      success: t('common.success'),
      error: t('common.error'),
      seatsLeft: t('rideDetails.seatsLeft'),
      startsIn: t('myRides.startsIn'),
      mins: t('myRides.mins'),
      journeyComfort: t('rideDetails.journeyComfort'),
      journeyItinerary: t('rideDetails.journeyItinerary'),
      yourFare: t('rideDetails.yourFare'),
      perSeatNote: t('rideDetails.perSeatNote'),
      smokeFree: t('rideDetails.smokeFree'),
      petsWelcome: t('rideDetails.petsWelcome'),
      luggageOk: t('rideDetails.luggageOk'),
      ladiesOnly: t('rideDetails.ladiesOnly'),
      approvalRequired: t('rideDetails.approvalRequired'),
      instantBooking: t('rideDetails.instantBooking'),
      vibes: t('rideDetails.vibes'),
      date: t('rideDetails.date'),
      time: t('rideDetails.time'),
      duration: t('rideDetails.duration'),
      seatsLeftLabel: t('rideDetails.seatsLeftLabel'),
      assignedVehicle: t('rideDetails.assignedVehicle'),
      compactSedan: t('rideDetails.compactSedan'),
      premiumSuv: t('rideDetails.premiumSuv'),
      swiftBike: t('rideDetails.swiftBike'),
      standardVehicle: t('rideDetails.standardVehicle'),
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

