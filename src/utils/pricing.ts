import { RideType } from '@/constants/enums';
import {
  INTERCITY_PRICING_CONFIG,
  INTRACITY_PRICING_CONFIG,
  PricingBound,
} from '@/constants/pricingPolicy';

export { INTERCITY_PRICING_CONFIG, INTRACITY_PRICING_CONFIG };
export const PRICING_MULTIPLIERS = { MIN: 7, MID: 10, MAX: 12 };

/** Round a monetary amount to the supplied increment. */
export const roundToNearest = (value: number, nearest = 10): number =>
  Math.round(value / nearest) * nearest;

/** Calculate the intercity recommendation or permitted price bound. */
export const calculateBlaBlaCarPrice = (
  distanceKm: number,
  type: PricingBound = PricingBound.MID,
  seater: '5' | '7' = '5',
): number => {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) return 0;
  const config = INTERCITY_PRICING_CONFIG;
  const rate =
    type === PricingBound.MIN
      ? config.MIN_RATE_PER_KM
      : type === PricingBound.MAX
        ? config.MAX_RATE_PER_KM
        : config.RECOMMENDED_RATE_PER_KM;

  return roundToNearest(
    Math.max(
      distanceKm * rate * config.SEATER_MULTIPLIER[seater],
      config.MIN_FARE,
    ),
  );
};

/** Calculate cumulative city pricing; bounds are rounded inward. */
export const calculateIntracityPrice = (
  distanceKm: number,
  type: PricingBound = PricingBound.MID,
  seater: '5' | '7' = '5',
): number => {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) return 0;
  const config = INTRACITY_PRICING_CONFIG;
  const base =
    Math.min(distanceKm, config.BAND_1_KM) * config.BAND_1_RATE +
    Math.min(Math.max(distanceKm - config.BAND_1_KM, 0), config.BAND_2_KM) *
      config.BAND_2_RATE +
    Math.max(distanceKm - (config.BAND_1_KM + config.BAND_2_KM), 0) *
      config.BAND_3_RATE;
  const recommended = roundToNearest(
    Math.max(base * config.SEATER_MULTIPLIER[seater], config.MIN_FARE),
    config.ROUNDING,
  );
  const minFloor = roundToNearest(
    config.MIN_FARE * config.MIN_BOUND_FACTOR,
    config.ROUNDING,
  );
  if (type === PricingBound.MIN) {
    return Math.max(
      minFloor,
      roundToNearest(recommended * config.MIN_BOUND_FACTOR, config.ROUNDING),
    );
  }
  if (type === PricingBound.MAX) {
    return roundToNearest(
      recommended * config.MAX_BOUND_FACTOR,
      config.ROUNDING,
    );
  }

  return recommended;
};

/** Apply the selected ride's policy, independent of the search tab. */
export const calculateSmartPrice = (
  distanceKm: number,
  rideType: RideType = RideType.INTERCITY,
  type: PricingBound = PricingBound.MID,
  seater: '5' | '7' = '5',
): number =>
  rideType === RideType.LOCAL
    ? calculateIntracityPrice(distanceKm, type, seater)
    : calculateBlaBlaCarPrice(distanceKm, type, seater);

/** Compatibility entry point for existing intercity consumers. */
export const calculateBasePrice = (
  distanceKm: number,
  multiplier: number,
  divisor = 1,
) => {
  const bound =
    multiplier <= PRICING_MULTIPLIERS.MIN
      ? PricingBound.MIN
      : multiplier >= PRICING_MULTIPLIERS.MAX
        ? PricingBound.MAX
        : PricingBound.MID;

  return calculateBlaBlaCarPrice(distanceKm, bound, divisor >= 6 ? '7' : '5');
};

/** Apply up to 10% before rounding the extra amount to the nearest step (default ₹10, ₹5 for city). */
export const calculateFrontSeatPrice = (
  basePrice: number,
  premiumPercentage = 0,
  step = 10,
) => {
  if (!Number.isFinite(basePrice) || basePrice < 0) return 0;
  const percentage = Number.isFinite(premiumPercentage)
    ? Math.min(10, Math.max(0, premiumPercentage))
    : 0;

  return basePrice + roundToNearest((basePrice * percentage) / 100, step);
};

/** Determine whether a selected fare qualifies for the recommendation badge. */
export const isRecommendedPrice = (price: number, recommended: number) =>
  recommended > 0 && Math.abs(price - recommended) <= recommended * 0.15;

interface PricedStop {
  priceFromPreviousStop?: number | null;
  frontSeatPriceFromPreviousStop?: number | null;
}

/** Read an explicit booking quote, otherwise subtract cumulative stop fares. */
export const calculateSegmentPrice = (
  stops: PricedStop[],
  directPrice?: number | null,
  isFrontSeat = false,
): number => {
  if (directPrice !== undefined && directPrice !== null) return directPrice;
  const first = stops[0],
    last = stops[stops.length - 1];
  if (!first || !last) return 0;
  const key = isFrontSeat
    ? 'frontSeatPriceFromPreviousStop'
    : 'priceFromPreviousStop';

  return (last[key] ?? 0) - (first[key] ?? 0);
};
