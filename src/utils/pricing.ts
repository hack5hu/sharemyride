export const PRICING_MULTIPLIERS = {
  MIN: 7,
  MID: 10,
  MAX: 12,
};

export const roundToNearest = (value: number, nearest: number = 10) => {
  return Math.round(value / nearest) * nearest;
};

export const calculateBasePrice = (distanceKm: number, multiplier: number, divisor: number = 1) => {
  return roundToNearest((distanceKm * multiplier) / divisor, 10);
};

export const calculateFrontSeatPrice = (basePrice: number, premiumPercentage: number = 0) => {
  return roundToNearest(basePrice * (1 + premiumPercentage / 100), 10);
};

import { RouteStop } from '@/serviceManager/rideService';

/**
 * Calculates the segment price using the prefix algorithm (last stop cumulative - first stop cumulative).
 * Fallback to direct price if prefix calculation isn't possible.
 */
export const calculateSegmentPrice = (
  stops: RouteStop[] | any[],
  directPrice?: number | null,
  isFrontSeat: boolean = false
): number => {
  if (!stops || stops.length === 0) return directPrice ?? 0;

  const firstStop = stops[0];
  const lastStop = stops[stops.length - 1];

  if (!firstStop || !lastStop) return directPrice ?? 0;

  const priceKey = isFrontSeat ? 'frontSeatPriceFromPreviousStop' : 'priceFromPreviousStop';
  
  const cumulativeLast = lastStop[priceKey] || 0;
  const cumulativeFirst = firstStop[priceKey] || 0;

  const calculated = cumulativeLast - cumulativeFirst;

  // We check for directPrice being exactly null or undefined. 
  // If it's 0, we still respect it as a valid price if it was explicitly provided.
  return (directPrice !== undefined && directPrice !== null) ? directPrice : calculated;
};
