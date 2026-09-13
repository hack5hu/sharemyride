import { useCallback } from 'react';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import {
  AnalyticsEvent,
  AnalyticsService,
} from '@/serviceManager/AnalyticsService';
import { RideService } from '@/serviceManager/RideService';
import { type RidePublishState } from '@/store/types/publish';
import { useMyRidesStore } from '@/store/useMyRidesStore';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { getErrorMessage } from '@/utils/error';
import { saveRecentPublishedRide } from '@/utils/recentPublishedRides';
import {
  buildPublishRidePayload,
  PublishValidationError,
} from './utils/publishPayloadBuilder';

export const useSummaryActions = (
  _publishStore: RidePublishState,
  setIsPublishing: (isPublishing: boolean) => void,
) => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const { addDraft, removeDraft } = useMyRidesStore();

  const handlePublish = useCallback(async () => {
    const s = useRidePublishStore.getState();
    if (
      !s.startLocation ||
      !s.destinationLocation ||
      !s.departureTime ||
      !s.vehicleId
    ) {
      return;
    }
    setIsPublishing(true);
    try {
      const payload = buildPublishRidePayload(s);

      const response = await RideService.publishRide(payload);

      saveRecentPublishedRide({
        rideType: s.rideType,
        startLocation: s.startLocation,
        destinationLocation: s.destinationLocation,
        middleStops: s.middleStops,
        routeDetails: s.routeDetails,
        selectedRoute: s.selectedRoute,
        seatCount: s.seatCount,
        selectedSeatIds: s.selectedSeatIds,
        vehicleId: s.vehicleId,
        publishVehicleType: s.publishVehicleType,
        vehicleDetails: s.vehicleDetails,
        preferences: s.preferences,
        price: s.price,
        fullJourneyPrice: s.fullJourneyPrice,
        frontSeatPrice: s.frontSeatPrice,
        premiumEnabled: s.premiumEnabled,
        premiumPercentage: s.premiumPercentage,
        segmentPrices: s.segmentPrices,
        requestType: s.requestType,
        departureDate: s.departureDate,
        departureTime: s.departureTime,
      });

      if (s.editingDraftId) {
        removeDraft(s.editingDraftId);
      }

      const hasSkippedDates =
        Array.isArray(response?.skippedDates) &&
        response.skippedDates.length > 0;
      const skippedMessage = hasSkippedDates ? response?.message : undefined;

      navigation.reset({
        index: 1,
        routes: [
          { name: 'BookRideInfo' },
          {
            name: 'PublishSuccess',
            params: {
              skippedMessage,
              skippedDates: response?.skippedDates,
            },
          },
        ],
      });

      AnalyticsService.logEvent(AnalyticsEvent.RIDE_PUBLISHED, {
        vehicle_id: s.vehicleId,
        seat_count: s.seatCount,
        price: s.price,
        full_journey_price: s.fullJourneyPrice,
        ride_type: s.rideType,
      });

      s.clearPublishState();
    } catch (error: unknown) {
      console.error('Publish failed:', error);
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        error instanceof Error &&
          Object.values(PublishValidationError).some(
            value => value === error.message,
          )
          ? t('notification.defaultErrorMessage')
          : getErrorMessage(error, t('notification.defaultErrorMessage')),
      );
    } finally {
      setIsPublishing(false);
    }
  }, [navigation, removeDraft, setIsPublishing, t]);

  const handleSave = useCallback(() => {
    const s = useRidePublishStore.getState();
    addDraft(
      {
        rideType: s.rideType,
        startLocation: s.startLocation,
        destinationLocation: s.destinationLocation,
        middleStops: s.middleStops,
        departureDate: s.departureDate,
        departureDates: s.departureDates,
        departureTime: s.departureTime,
        seatCount: s.seatCount,
        selectedSeatIds: s.selectedSeatIds,
        publishVehicleType: s.publishVehicleType,
        vehicleDetails: s.vehicleDetails,
        vehicleId: s.vehicleId,
        preferences: s.preferences,
        price: s.price,
        fullJourneyPrice: s.fullJourneyPrice,
        frontSeatPrice: s.frontSeatPrice,
        premiumEnabled: s.premiumEnabled,
        premiumPercentage: s.premiumPercentage,
        routeDetails: s.routeDetails,
        segmentPrices: s.segmentPrices,
        selectedRoute: s.selectedRoute,
        requestType: s.requestType,
      },
      s.editingDraftId,
    );
    s.clearPublishState();
    (navigation.navigate as any)('MyRides', { tab: 'drafts' });
  }, [addDraft, navigation]);

  return {
    handlePublish,
    handleSave,
  };
};
