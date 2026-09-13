import { RideType } from '@/constants/enums';
import { type PublishDraft } from '@/store/types/publish';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import {
  buildJourneyPricing,
  isValidJourneyPrice,
} from '@/utils/journeyPricing';
import { calculateSmartPrice } from '@/utils/pricing';

/** Restore legacy and current drafts with their mode and a recalculated quote. */
export const restorePublishDraft = (
  draft: PublishDraft,
  editingDraftId: string | null = null,
) => {
  useRidePublishStore.getState().clearPublishState();
  const defaults = useRidePublishStore.getState();
  const rideType =
    draft.rideType === RideType.LOCAL ? RideType.LOCAL : RideType.INTERCITY;
  const seater = draft.publishVehicleType ?? defaults.publishVehicleType;
  const routeDetails = draft.routeDetails ?? null;
  const distanceKm = (routeDetails?.totalDistanceMeters ?? 0) / 1000;
  const previousPrice = Number(draft.price ?? 0);
  const price = isValidJourneyPrice(previousPrice, distanceKm, rideType, seater)
    ? previousPrice
    : calculateSmartPrice(distanceKm, rideType, undefined, seater);
  const departureDates = draft.departureDates?.length
    ? draft.departureDates
    : draft.departureDate
    ? [draft.departureDate]
    : [];

  useRidePublishStore.setState({
    ...draft,
    rideType,
    routeDetails,
    publishVehicleType: seater,
    editingDraftId,
    departureDates,
    departureDate: departureDates[0] ?? null,
    middleStops: rideType === RideType.LOCAL ? [] : draft.middleStops ?? [],
    ...buildJourneyPricing(
      price,
      routeDetails?.legs ?? [],
      rideType,
      draft.premiumEnabled,
      draft.premiumPercentage,
      draft.segmentPrices,
    ),
  });
};
