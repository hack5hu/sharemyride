export const PRICING_MULTIPLIERS = {
  MIN: 7,
  MID: 9.5,
  MAX: 12,
} as const;

/**
 * Rounds a value to the nearest multiple of a given base.
 */
export const roundToNearest = (value: number, base: number): number => {
  return Math.round(value / base) * base;
};

/**
 * Calculates base price based on distance, multiplier, and seat count.
 * Formula: (Distance * Multiplier) / Seats
 * Rounding Rule: nearest multiple of 10.
 */
export const calculateBasePrice = (
  distanceKm: number, 
  multiplier: number = PRICING_MULTIPLIERS.MID,
  seatCount: number = 1
): number => {
  const totalTripCost = distanceKm * multiplier;
  const pricePerSeat = totalTripCost / Math.max(seatCount, 1);
  return roundToNearest(pricePerSeat, 10);
};

/**
 * Calculates front seat premium.
 * Maximum 10% higher than the base price
 * Rounded to the nearest multiple of 5
 */
export const calculateFrontSeatPrice = (basePrice: number, percentage: number): number => {
  // percentage is 0-10 (as in 0% to 10%)
  const clampedPercentage = Math.min(percentage, 10) / 100;
  const premium = basePrice * clampedPercentage;
  return roundToNearest(basePrice + premium, 5);
};
