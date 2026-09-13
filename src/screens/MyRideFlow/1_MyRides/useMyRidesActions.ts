import { useCallback } from 'react';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { RideService } from '@/serviceManager/RideService';
import { useMyRidesStore } from '@/store/useMyRidesStore';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { getErrorMessage } from '@/utils/error';
import { restorePublishDraft } from '@/utils/publishDraft';
import { isPublishRouteValid } from '@/utils/publishRouteValidation';

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
          restorePublishDraft(draft.state, draft.id);
          const restored = useRidePublishStore.getState();
          navigation.navigate(
            isPublishRouteValid(
              restored.routeDetails,
              restored.rideType,
              restored.middleStops.length + 2,
            ) && restored.selectedRoute?.polylineString
              ? 'PriceSelection'
              : 'RouteSelection',
          );
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
    [navigation, drafts],
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
              await RideService.cancelRide(id, 'Cancelled from my rides tab');
              fetchInitialRides();
            } catch (error: unknown) {
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
