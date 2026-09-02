import { useRoute, useIsFocused } from '@react-navigation/native';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { type MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';
import { NotificationType } from '@/constants/enums';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { RideService } from '@/serviceManager/RideService';
import { getErrorMessage } from '@/utils/error';
import { mapBackendRideToUI } from '@/utils/rideMapper';
import { storage } from '@/utils/storage';
import { type MyRidesHookData, type RideListItem } from './types.d';
import { useMyRidesActions } from './useMyRidesActions';
import { useMyRidesData, TAB_TO_FILTER } from './useMyRidesData';

export const useMyRides = (): MyRidesHookData => {
  const { t } = useTranslation();
  const route = useRoute<any>();
  const initialTab = route.params?.tab || 'upcoming';
  const [activeTab, setActiveTab] = useState<MyRidesTab>(initialTab);

  useEffect(() => {
    if (route.params?.tab) {
      setActiveTab(route.params.tab);
    }
  }, [route.params?.tab]);

  const [isActionLoading, setIsActionLoading] = useState(false);

  const {
    isLoading,
    isRefreshing,
    onRefresh,
    onLoadMore,
    rides,
    fetchInitialRides,
  } = useMyRidesData(activeTab);

  // Auto-switch to requests tab if data exists on first load
  useState(() => {
    if (rides?.[3]?.data?.length > 0) {
      setActiveTab('requests');
    }
  });

  const [confirmModalConfig, setConfirmModalConfig] = useState<{
    isVisible: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    type?: 'info' | 'danger' | 'warning';
  }>({
    isVisible: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const showConfirm = useCallback((config: any) => {
    setConfirmModalConfig({
      isVisible: true,
      title: config.title,
      message: config.message,
      confirmLabel: config.confirmLabel,
      cancelLabel: config.cancelLabel,
      onConfirm: () => {
        config.onConfirm();
        setConfirmModalConfig(prev => ({ ...prev, isVisible: false }));
      },
      type: config.type,
    });
  }, []);

  const hideConfirmModal = useCallback(() => {
    setConfirmModalConfig(prev => ({ ...prev, isVisible: false }));
  }, []);

  const {
    onRidePress,
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    onChatPress,
    drafts,
  } = useMyRidesActions(fetchInitialRides, showConfirm);

  const onTabChange = useCallback((tab: MyRidesTab) => {
    setActiveTab(tab);
  }, []);

  const mappedRequests = useMemo(
    () =>
      (rides?.[3]?.data || []).map(r =>
        mapBackendRideToUI(r, 'requests' as any, t),
      ),
    [rides?.[3]?.data, t],
  );

  const hasRequests = mappedRequests.length > 0;

  // If on requests tab and requests disappear, switch to upcoming
  useEffect(() => {
    if (activeTab === 'requests' && !hasRequests) {
      setActiveTab('upcoming');
    }
  }, [activeTab, hasRequests]);

  const formattedDrafts = useMemo((): RideListItem[] => {
    return drafts.map(draft => {
      const start = draft.state.startLocation?.name || 'Unknown';
      const end = draft.state.destinationLocation?.name || 'Unknown';
      const dateStr = draft.state.departureDate
        ? new Date(draft.state.departureDate).toLocaleDateString()
        : 'No date';

      return {
        id: draft.id,
        title: `${start} to ${end}`,
        subtitle: `Draft • ${dateStr}`,
        price: draft.state.fullJourneyPrice
          ? `₹${draft.state.fullJourneyPrice}`
          : draft.state.price
          ? `₹${draft.state.price}`
          : '₹0',
        type: 'draft' as const,
      };
    });
  }, [drafts]);

  const mappedUpcoming = useMemo(
    () =>
      (rides?.[1]?.data || []).map(r => mapBackendRideToUI(r, 'upcoming', t)),
    [rides?.[1]?.data, t],
  );

  const mappedArchive = useMemo(
    () =>
      (rides?.[2]?.data || []).map(r => mapBackendRideToUI(r, 'archive', t)),
    [rides?.[2]?.data, t],
  );

  const getTabData = useCallback(
    (tab: MyRidesTab) => {
      if (tab === 'drafts') return formattedDrafts;
      if (tab === 'requests') return mappedRequests;

      const allRides = tab === 'upcoming' ? mappedUpcoming : mappedArchive;

      return [...allRides].sort((a, b) => {
        const timeA = a.rawDate?.getTime() || 0;
        const timeB = b.rawDate?.getTime() || 0;

        return tab === 'upcoming' ? timeA - timeB : timeB - timeA;
      });
    },
    [mappedUpcoming, mappedArchive, mappedRequests, formattedDrafts],
  );

  const onAcceptBooking = useCallback(
    async (id: string) => {
      setIsActionLoading(true);
      try {
        await RideService.acceptBooking(id);
        showNotification(
          NotificationType.SUCCESS,
          t('notification.defaultSuccessTitle'),
          t('notification.bookingAccepted'),
        );
        onRefresh();
      } catch (error: any) {
        console.error('Failed to accept booking:', error);
        showNotification(
          NotificationType.ERROR,
          t('notification.defaultErrorTitle'),
          getErrorMessage(error, t('notification.defaultErrorMessage')),
        );
      } finally {
        setIsActionLoading(false);
      }
    },
    [onRefresh, t],
  );

  const onRejectBooking = useCallback(
    async (id: string) => {
      setIsActionLoading(true);
      try {
        await RideService.rejectBooking(id);
        showNotification(
          NotificationType.SUCCESS,
          t('notification.defaultSuccessTitle'),
          t('notification.bookingRejected'),
        );
        onRefresh();
      } catch (error: any) {
        console.error('Failed to reject booking:', error);
        showNotification(
          NotificationType.ERROR,
          t('notification.defaultErrorTitle'),
          getErrorMessage(error, t('notification.defaultErrorMessage')),
        );
      } finally {
        setIsActionLoading(false);
      }
    },
    [onRefresh, t],
  );

  const isFocused = useIsFocused();
  const navigation = useAppNavigation();

  const pendingReview = useMemo(() => {
    const archiveData = rides?.[2]?.data || [];
    const ratedStr = storage.getString('rated_rides') || '[]';
    const dismissedStr = storage.getString('dismissed_ratings') || '[]';
    const ratedUsersStr = storage.getString('rated_users') || '[]';

    let ratedIds: string[] = [];
    let ratedUsers: string[] = [];
    try {
      ratedIds = [
        ...JSON.parse(ratedStr),
        ...JSON.parse(dismissedStr),
      ].map((id: any) => String(id));
      ratedUsers = JSON.parse(ratedUsersStr).map((id: any) => String(id));
    } catch {
      ratedIds = [];
      ratedUsers = [];
    }

    const completed = archiveData.filter(
      (r: any) =>
        r &&
        r.status !== 'CANCELLED' &&
        r.status !== 'REJECTED' &&
        r.rideStatus !== 'CANCELLED',
    );

    const unrated = completed.find((r: any) => {
      const id = String(r.rideId || r.bookingId || r.id || r._id || '');
      if (!id || ratedIds.includes(id)) return false;

      const isDriver = r.role === 'DRIVER';
      const passengersList = r.passengers || r.coPassengers || [];
      if (isDriver) {
        const hasNoPassengers =
          (Array.isArray(passengersList) && passengersList.length === 0) ||
          r.bookedSeats === 0 ||
          r.totalBookedSeats === 0 ||
          r.seatsBooked === 0;
        if (hasNoPassengers) return false;

        if (Array.isArray(passengersList) && passengersList.length > 0) {
          const hasUnratedPassenger = passengersList.some((p: any) => {
            const pId = String(
              p.id || p.userId || p.bookingId || p.passengerId || '',
            );
            const isPassengerRated =
              p.hasRated === true ||
              ratedUsers.includes(pId) ||
              ratedUsers.includes(`${id}_${pId}`);

            return !isPassengerRated;
          });

          return hasUnratedPassenger;
        }
      } else {
        const driverId = String(
          r.driver?.id ||
            r.driver?.driverId ||
            r.driver?.userId ||
            r.driverId ||
            r.userId ||
            '',
        );
        const isPassengerTripRated =
          r.hasRated === true ||
          r.isRated === true ||
          r.driver?.hasRated === true ||
          r.myBooking?.hasRatedDriver === true ||
          (driverId ? ratedUsers.includes(driverId) : false) ||
          (driverId ? ratedUsers.includes(`${id}_${driverId}`) : false);

        if (isPassengerTripRated) {
          return false;
        }
      }

      return true;
    });

    if (!unrated) return null;

    const targetRideId = String(
      unrated.rideId || unrated.bookingId || unrated.id || unrated._id,
    );
    const isDriver = unrated.role === 'DRIVER';
    const driverName =
      unrated.driver?.name ||
      unrated.driverName ||
      unrated.hostName ||
      unrated.name ||
      'Driver';
    const driverId =
      unrated.driver?.id ||
      unrated.driver?.driverId ||
      unrated.driver?.userId ||
      unrated.driverId ||
      unrated.userId;
    const driverAvatar =
      unrated.driver?.photoUrl ||
      unrated.driver?.avatar ||
      unrated.driverPhotoUrl ||
      unrated.photoUrl;

    return {
      rideId: targetRideId,
      isDriver,
      title: isDriver
        ? `Rate your co-riders for ${
            unrated.sourceStopName?.split(',')[0] || 'your trip'
          }`
        : `Rate your trip with ${driverName}`,
      targetUserId: isDriver ? undefined : String(driverId || 'driver-1'),
      targetUserName: driverName,
      targetUserAvatar: driverAvatar,
    };
  }, [rides?.[2]?.data, isFocused]);

  const onRateReview = useCallback(
    (review: any) => {
      if (!review) return;
      if (review.isDriver) {
        (navigation.navigate as any)('RideDetails', {
          rideId: review.rideId,
          status: 'COMPLETED',
        });
      } else {
        (navigation.navigate as any)('Rating', {
          rideId: review.rideId,
          targetUserId: review.targetUserId,
          targetUserName: review.targetUserName,
          targetUserRole: 'DRIVER',
          targetUserAvatar: review.targetUserAvatar,
        });
      }
    },
    [navigation],
  );

  return {
    activeTab,
    isLoading,
    isRefreshing,
    isActionLoading,
    onTabChange,
    onRidePress,
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    onChatPress,
    onRefresh,
    onLoadMore,
    hasMore: TAB_TO_FILTER[activeTab]
      ? rides?.[TAB_TO_FILTER[activeTab]!]?.hasMore
      : false,
    getTabData,
    drafts,
    mappedRequests,
    hasRequests,
    pendingReview,
    onRateReview,
    onMenuPress: () => {},
    onProfilePress: () => {},
    onAcceptRide: onAcceptBooking,
    onRejectRide: onRejectBooking,
    confirmModalConfig,
    hideConfirmModal,
  };
};
