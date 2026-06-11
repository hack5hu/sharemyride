import { useCallback } from 'react';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useMyRidesStore } from '@/store/useMyRidesStore';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import rideService from '@/serviceManager/rideService';
import { useTranslation } from '@/hooks/useTranslation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';

export const useMyRidesActions = (
  fetchInitialRides: () => void,
  showConfirm?: (config: {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    type?: 'info' | 'danger' | 'warning';
  }) => void,
) => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const { drafts, clearDrafts, removeDraft } = useMyRidesStore();
  const publishStore = useRidePublishStore();

  const restoreDraftToStore = useCallback(
    (draftState: any) => {
      const s = draftState;
      if (s.startLocation) publishStore.setStartLocation(s.startLocation);
      if (s.destinationLocation)
        publishStore.setDestinationLocation(s.destinationLocation);
      if (s.middleStops) publishStore.setMiddleStops(s.middleStops);
      if (s.departureDate) publishStore.setDepartureDate(s.departureDate);
      if (s.departureTime) publishStore.setDepartureTime(s.departureTime);
      if (s.seatCount) publishStore.setSeatCount(s.seatCount);
      if (s.selectedSeatIds) publishStore.setSelectedSeatIds(s.selectedSeatIds);
      if (s.publishVehicleType)
        publishStore.setPublishVehicleType(s.publishVehicleType);
      if (s.vehicleDetails) publishStore.setVehicleDetails(s.vehicleDetails);
      if (s.vehicleId) publishStore.setVehicleId(s.vehicleId);
      if (s.preferences) publishStore.setPreferences(s.preferences);
      if (s.routeDetails) publishStore.setRouteDetails(s.routeDetails);
      if (s.selectedRoute) publishStore.setSelectedRoute(s.selectedRoute);
      if (s.price !== undefined) {
        publishStore.setPricing({
          price: Number(s.price),
          fullJourneyPrice: Number(s.fullJourneyPrice ?? s.price),
          frontSeatPrice: Number(s.frontSeatPrice ?? s.price),
          premiumEnabled: Boolean(s.premiumEnabled),
          premiumPercentage: Number(s.premiumPercentage || 0),
          segmentPrices: s.segmentPrices || {},
        });
      }
      if (s.requestType) publishStore.setRequestType(s.requestType);
    },
    [publishStore],
  );

  const onRidePress = useCallback(
    (params: {
      id: string;
      rideId?: string;
      sourceStopId?: number;
      destinationStopId?: number;
    }) => {
      const { id, rideId, sourceStopId, destinationStopId } = params;
      if (id.startsWith('draft-')) {
        const draft = drafts.find(d => d.id === id);
        if (draft) {
          publishStore.clearPublishState();
          publishStore.setEditingDraftId(draft.id);
          restoreDraftToStore(draft.state);
          navigation.navigate('SummaryPublish');
        }
      } else {
        navigation.navigate('RideDetails', {
          rideId: rideId || id,
          sourceStopId,
          destinationStopId,
          status: (params as any).status,
          cancellationReason: (params as any).cancellationReason,
        });
      }
    },
    [navigation, drafts, publishStore, restoreDraftToStore],
  );

  const onRemoveDraft = useCallback(
    (id: string) => {
      if (showConfirm) {
        showConfirm({
          title: t('myRides.deleteDraftAlertTitle'),
          message: t('myRides.deleteDraftAlertMsg'),
          confirmLabel: t('myRides.deleteDraftConfirm'),
          cancelLabel: t('myRides.deleteDraftCancel'),
          type: 'danger',
          onConfirm: () => removeDraft(id),
        });
      }
    },
    [removeDraft, t, showConfirm],
  );

  const onCancelRide = useCallback(
    (id: string | number) => {
      if (showConfirm) {
        showConfirm({
          title: t('myRides.cancelRideAlertTitle'),
          message: t('myRides.cancelRideAlertMsg'),
          confirmLabel: t('myRides.cancelRideConfirm'),
          cancelLabel: t('myRides.cancelRideKeep'),
          type: 'danger',
          onConfirm: async () => {
            try {
              await rideService.cancelRide(id, 'Cancelled from my rides tab');
              fetchInitialRides();
            } catch (error: any) {
              showNotification(
                NotificationType.ERROR,
                t('notification.defaultErrorTitle'),
                getErrorMessage(
                  error,
                  t('myRides.cancelRideError') ||
                    t('notification.defaultErrorMessage'),
                ),
              );
            }
          },
        });
      }
    },
    [fetchInitialRides, t, showConfirm],
  );

  const onClearDrafts = useCallback(() => {
    if (showConfirm) {
      showConfirm({
        title: t('myRides.clearDraftsAlertTitle'),
        message: t('myRides.clearDraftsAlertMsg'),
        confirmLabel: t('myRides.clearDraftsConfirm'),
        cancelLabel: t('myRides.clearDraftsCancel'),
        type: 'danger',
        onConfirm: () => clearDrafts(),
      });
    }
  }, [clearDrafts, t, showConfirm]);

  const onChatPress = useCallback(
    (item: any) => {
      navigation.navigate('ChatDetails', {
        userId: item.driverId || item.id,
        rideId: item.rideId || item.id,
        name: item.driverName || item.title,
        avatarUri: item.avatarUri,
        rating: item.rating,
        rideInfo: {
          pickup: item.pickupLocation,
          dropoff: item.dropoffLocation,
          date: item.subtitle,
          time: item.pickupTime,
        },
      });
    },
    [navigation],
  );

  return {
    onRidePress,
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    onChatPress,
    drafts,
  };
};
