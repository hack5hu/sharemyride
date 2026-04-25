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
