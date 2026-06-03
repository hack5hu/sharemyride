import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/store/useAuthStore';
import { RideDetailsScreenProps } from './types';
import rideService from '@/serviceManager/rideService';
import { useMyRidesStore } from '@/store/useMyRidesStore';
import { Logger } from '@/utils/logger';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';

export const useRideDetails = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RideDetailsScreenProps['route']>();
  const { rideId, sourceStopId, destinationStopId } = route.params;
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [rideData, setRideData] = useState<any>(null);

  const fetchDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await rideService.getMyRideDetail(rideId, sourceStopId, destinationStopId);
      
      // Merge route parameters if fields are missing in raw response
      if (data) {
        if (!data.status && route.params.status) {
          data.status = route.params.status;
        }
        if (!data.cancellationReason && route.params.cancellationReason) {
          data.cancellationReason = route.params.cancellationReason;
        }
      }
      
      setRideData(data);
    } catch (error) {
      Logger.error('Fetching ride details failed:', error);
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        getErrorMessage(error, t('notification.defaultErrorMessage'))
      );
    } finally {
      setIsLoading(false);
    }
  }, [rideId, sourceStopId, destinationStopId, route.params]);

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
    return rideData?.role === 'DRIVER';
  }, [rideData]);

  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<{ type: 'RIDE' | 'BOOKING'; id: string | number; isSelf?: boolean } | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const handleReportRide = useCallback(() => {
    setIsReportModalVisible(true);
  }, []);

  const handleReportSubmit = useCallback((_data: { categoryId: string; description: string }) => {
    setIsReportModalVisible(false);
    showNotification(
      NotificationType.SUCCESS,
      t('rideDetails.reportSuccessTitle'),
      t('rideDetails.reportSuccessMessage')
    );
  }, [t]);

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

  const handleConfirmCancel = useCallback(async ({ categoryId, description }: { categoryId: string; description: string }) => {
    if (!cancelTarget) return;

    const reason = description ? `${categoryId}: ${description}` : categoryId;

    const bookingId = cancelTarget.id || rideData?.myBooking?.bookingId || rideId;
    setIsCancelling(true);
    try {
      if (cancelTarget.type === 'RIDE') {
        await rideService.cancelRide(bookingId, reason);
        const { removeRide } = useMyRidesStore.getState();
        removeRide(1, rideId);
        navigation.goBack();
      } else {
        await rideService.cancelBooking(bookingId, reason);
        if (cancelTarget.isSelf) {
          const { removeRide } = useMyRidesStore.getState();
          removeRide(1, bookingId);
          navigation.goBack();
        } else {
          fetchDetails();
        }
      }
      setIsCancelModalVisible(false);
      Alert.alert(t('common.success'), t('cancelRide.successMessage'));
    } catch (error) {
      Alert.alert(t('common.error'), getErrorMessage(error, t('cancelRide.errorMessage')));
    } finally {
      setIsCancelling(false);
    }
  }, [cancelTarget, rideData, fetchDetails, navigation, rideId, t]);

  const handleCancelRide = useCallback(() => {
    handleOpenCancelModal('RIDE', rideId, true);
  }, [rideId, handleOpenCancelModal]);

  const handleCancelPassenger = useCallback((bookingId: string) => {
    handleOpenCancelModal('BOOKING', bookingId, false);
  }, [handleOpenCancelModal]);

  const handleCancelOwnBooking = useCallback(() => {
    handleOpenCancelModal('BOOKING', rideData?.myBooking?.bookingId || 0, true);
  }, [rideData, handleOpenCancelModal]);

  const handleDriverProfile = useCallback(() => {
    // Navigation to driver profile would go here
  }, []);

  const handleChat = useCallback(() => {
    const targetName = isDriver ? t('rideDetails.passengers') : (rideData?.driver?.name || t('rideDetails.driver'));
    const startLoc = rideData?.stops?.[0]?.stopName?.split(',')[0] || '';
    const endLoc = rideData?.stops?.[rideData?.stops.length - 1]?.stopName?.split(',')[0] || '';
    const startTimeStr = rideData?.startTime 
      ? new Date(rideData.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '';
    const dateStr = rideData?.startTime
      ? new Date(rideData.startTime).toLocaleDateString()
      : '';

    (navigation.navigate as any)('ChatDetails', { 
      userId: isDriver 
        ? (rideData?.passengers?.[0]?.passengerId) 
        : (rideData?.driver?.driverId || rideData?.driver?.userId),
      rideId: rideId,
      name: targetName,
      avatarUri: isDriver ? undefined : rideData?.driver?.photoUrl,
      rideInfo: {
        pickup: startLoc,
        dropoff: endLoc,
        date: dateStr,
        time: startTimeStr,
      }
    });
  }, [navigation, rideId, rideData, isDriver, t]);

  const handleViewRoute = useCallback((index?: number) => {
    if (index === undefined) return;
    const point = rideData?.stops?.[index];
    if (point) {
      Alert.alert(t('common.openingMap'), `${t('common.navigatingTo')}: ${point.stopName.split(',')[0]}`);
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
      cancellationReason: t('rideDetails.cancellationReason'),
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
    cancellationReasons,
    handleConfirmCancel,
    isCancelling,
    cancelTarget,
    isReportModalVisible,
    setIsReportModalVisible,
    handleReportRide,
    handleReportSubmit,
  };
};
