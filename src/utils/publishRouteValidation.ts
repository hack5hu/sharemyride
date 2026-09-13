import { RideType } from '@/constants/enums';
import {
  INTERCITY_PRICING_CONFIG,
  INTRACITY_PRICING_CONFIG,
} from '@/constants/pricingPolicy';
import { type FinalRouteDetails } from '@/store/types/publish';

/** Enforce eligibility on measured road metres, never straight-line distance. */
export const isPublishDistanceValid = (
  distanceMeters: number,
  rideType: RideType,
) => {
  const config =
    rideType === RideType.LOCAL
      ? INTRACITY_PRICING_CONFIG
      : INTERCITY_PRICING_CONFIG;

  return (
    Number.isFinite(distanceMeters) &&
    distanceMeters >= config.MIN_DISTANCE_KM * 1000
  );
};

/** Reject absent, incomplete or mismatched road routes before publishing. */
export const isPublishRouteValid = (
  route: FinalRouteDetails | null,
  rideType: RideType,
  stopCount: number,
) =>
  !!route &&
  isPublishDistanceValid(route.totalDistanceMeters, rideType) &&
  Number.isFinite(route.totalDurationSeconds) &&
  route.totalDurationSeconds > 0 &&
  route.legs.length === stopCount - 1 &&
  route.legs.every(
    leg =>
      Number.isFinite(leg.distanceMeters) &&
      leg.distanceMeters > 0 &&
      Number.isFinite(leg.durationSeconds) &&
      leg.durationSeconds > 0,
  ) &&
  Math.abs(
    route.legs.reduce((total, leg) => total + leg.distanceMeters, 0) -
    route.totalDistanceMeters,
  ) <= Math.max(1, route.legs.length);
