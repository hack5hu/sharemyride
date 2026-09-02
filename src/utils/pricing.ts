export const PRICING_MULTIPLIERS = {
  MIN: 7,
  MID: 10,
  MAX: 12,
};

/**
 * Configurable pricing parameters for BlaBlaCar-style carpool pricing model in India.
 * Modify these rates to tweak recommended, minimum, or maximum pricing rules in the future.
 */
export const BLABLACAR_PRICING_CONFIG = {
  /** Recommended rate in INR per km per seat */
  RECOMMENDED_RATE_PER_KM: 2.25,
  /** Minimum rate in INR per km per seat */
  MIN_RATE_PER_KM: 1.80,
  /** Maximum rate in INR per km per seat */
  MAX_RATE_PER_KM: 2.80,
  /** Minimum base fare per seat in INR */
  MIN_FARE: 50,
  /** Seater multiplier adjustment */
  SEATER_MULTIPLIER: {
    '5': 1.0,
    '7': 1.1,
  },
};

export const roundToNearest = (value: number, nearest: number = 10) => {
  return Math.round(value / nearest) * nearest;
};

/**
 * Calculates BlaBlaCar-style seat pricing based on distance in kilometers.
 *
 * @param distanceKm Distance in km
 * @param type 'MID' (Recommended), 'MIN' (Minimum bound), or 'MAX' (Maximum bound)
 * @param seater Vehicle seating capacity ('5' or '7')
 * @returns Fare in INR rounded to nearest 10
 */
export const calculateBlaBlaCarPrice = (
  distanceKm: number,
  type: 'MID' | 'MIN' | 'MAX' = 'MID',
  seater: '5' | '7' = '5',
): number => {
  if (!distanceKm || distanceKm <= 0) return 0;

  const seaterMult = BLABLACAR_PRICING_CONFIG.SEATER_MULTIPLIER[seater] || 1.0;

  let ratePerKm = BLABLACAR_PRICING_CONFIG.RECOMMENDED_RATE_PER_KM;
  if (type === 'MIN') {
    ratePerKm = BLABLACAR_PRICING_CONFIG.MIN_RATE_PER_KM;
  } else if (type === 'MAX') {
    ratePerKm = BLABLACAR_PRICING_CONFIG.MAX_RATE_PER_KM;
  }

  const calculated = distanceKm * ratePerKm * seaterMult;
  const clamped = Math.max(calculated, BLABLACAR_PRICING_CONFIG.MIN_FARE);

  return roundToNearest(clamped, 10);
};

export const calculateBasePrice = (
  distanceKm: number,
  multiplier: number,
  divisor: number = 1,
) => {
  let type: 'MID' | 'MIN' | 'MAX' = 'MID';
  if (multiplier <= PRICING_MULTIPLIERS.MIN) {
    type = 'MIN';
  } else if (multiplier >= PRICING_MULTIPLIERS.MAX) {
    type = 'MAX';
  }
  const seater = divisor >= 6 ? '7' : '5';

  return calculateBlaBlaCarPrice(distanceKm, type, seater);
};

export const calculateFrontSeatPrice = (
  basePrice: number,
  premiumPercentage: number = 0,
) => {
  return roundToNearest(basePrice * (1 + premiumPercentage / 100), 10);
};

import { type RouteStop } from '@/serviceManager/RideService';

/**
 * Calculates the segment price using the prefix algorithm (last stop cumulative - first stop cumulative).
 * Fallback to direct price if prefix calculation isn't possible.
 */
export const calculateSegmentPrice = (
  stops: RouteStop[] | any[],
  directPrice?: number | null,
  isFrontSeat: boolean = false,
): number => {
  if (!stops || stops.length === 0) return directPrice ?? 0;

  const firstStop = stops[0];
  const lastStop = stops[stops.length - 1];

  if (!firstStop || !lastStop) return directPrice ?? 0;

  const priceKey = isFrontSeat
    ? 'frontSeatPriceFromPreviousStop'
    : 'priceFromPreviousStop';

  const cumulativeLast = lastStop[priceKey] || 0;
  const cumulativeFirst = firstStop[priceKey] || 0;

  const calculated = cumulativeLast - cumulativeFirst;

  // We check for directPrice being exactly null or undefined.
  // If it's 0, we still respect it as a valid price if it was explicitly provided.
  return directPrice !== undefined && directPrice !== null
    ? directPrice
    : calculated;
};
