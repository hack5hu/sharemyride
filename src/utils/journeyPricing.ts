import { RideType } from '@/constants/enums';
import { PricingBound } from '@/constants/pricingPolicy';
import { type RouteLeg } from '@/store/types/publish';
import { calculateFrontSeatPrice, calculateSmartPrice } from '@/utils/pricing';

/** Allocate one fare by road distance. Internal legs have no minimum fare.
 * Rounding cumulative rupee amounts preserves the full-route total exactly.
 */
export const allocateSegmentPrices = (
  price: number,
  legs: RouteLeg[],
  preferred: Record<string, number> = {},
): Record<string, number> => {
  if (!Number.isInteger(price) || price < 0 || legs.length === 0) return {};
  const distance = legs.reduce((total, leg) => total + leg.distanceMeters, 0);
  if (
    !Number.isFinite(distance) ||
    distance <= 0 ||
    legs.some(
      leg => !Number.isFinite(leg.distanceMeters) || leg.distanceMeters <= 0,
    )
  )
    {return {};}
  const amounts = legs.map((_, i) => preferred[`seg-${i}`]);
  if (
    amounts.every(value => Number.isInteger(value) && value >= 0) &&
    amounts.reduce((total, value) => total + value, 0) === price
  ) {
    return Object.fromEntries(amounts.map((value, i) => [`seg-${i}`, value]));
  }
  let covered = 0,
    previous = 0;

  return Object.fromEntries(
    legs.map((leg, i) => {
      covered += leg.distanceMeters;
      const cumulative =
        i === legs.length - 1
          ? price
          : Math.round((price * covered) / distance);
      const value = cumulative - previous;
      previous = cumulative;

      return [`seg-${i}`, value];
    }),
  );
};

/** Round the premium once for the journey, then distribute it across its legs. */
export const allocateFrontSeatPrices = (
  segmentPrices: Record<string, number>,
  percentage: number,
  step = 10,
): Record<string, number> => {
  const price = Object.values(segmentPrices).reduce((sum, amount) => sum + amount, 0);
  if (price <= 0) return { ...segmentPrices };
  const premium = calculateFrontSeatPrice(price, percentage, step) - price;
  let covered = 0;
  let previous = 0;

  return Object.fromEntries(Object.entries(segmentPrices).map(([id, amount]) => {
    covered += amount;
    const cumulative = Math.round(premium * covered / price);
    const frontPrice = amount + cumulative - previous;
    previous = cumulative;

    return [id, frontPrice];
  }));
};

/** Keep the displayed full-route and stop prices consistent. */
export const buildJourneyPricing = (
  price: number,
  legs: RouteLeg[],
  rideType: RideType,
  premiumEnabled = false,
  premiumPercentage = 0,
  preferred: Record<string, number> = {},
) => {
  const segmentPrices = allocateSegmentPrices(price, legs, preferred);
  const enabled = premiumEnabled;
  const step = rideType === RideType.LOCAL ? 5 : 10;
  const percentage =
    enabled && Number.isFinite(premiumPercentage)
      ? Math.max(0, Math.min(10, premiumPercentage))
      : 0;
  const frontSeatPrice = Object.values(
    allocateFrontSeatPrices(segmentPrices, percentage, step),
  ).reduce((total, amount) => total + amount, 0);

  return {
    price,
    fullJourneyPrice: price,
    frontSeatPrice,
    premiumEnabled: enabled,
    premiumPercentage: percentage,
    segmentPrices,
  };
};

/** Check a fare against the current route, ride type, vehicle and increment. */
export const isValidJourneyPrice = (
  price: number,
  distanceKm: number,
  rideType: RideType,
  seater: '5' | '7',
) =>
  Number.isFinite(price) &&
  price > 0 &&
  price % (rideType === RideType.LOCAL ? 5 : 10) === 0 &&
  price >=
    calculateSmartPrice(distanceKm, rideType, PricingBound.MIN, seater) &&
  price <= calculateSmartPrice(distanceKm, rideType, PricingBound.MAX, seater);

/** Map a rupee counter change to an attainable, capped premium across all legs. */
export const premiumPercentageForAmount = (
  amount: number,
  price: number,
  legs: RouteLeg[],
  preferred: Record<string, number> = {},
  rideType: RideType = RideType.INTERCITY,
) => {
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  const extraAt = (percentage: number) =>
    buildJourneyPricing(
      price,
      legs,
      rideType,
      true,
      percentage,
      preferred,
    ).frontSeatPrice - price;
  if (amount >= extraAt(10)) return 10;
  let low = 0;
  let high = 10;
  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2;
    if (extraAt(mid) <= amount) low = mid;
    else high = mid;
  }

  return low;
};
