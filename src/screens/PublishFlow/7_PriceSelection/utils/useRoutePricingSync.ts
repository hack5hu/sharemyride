import { useMemo } from 'react';
import { type SegmentPrice } from '@/components/molecules/SegmentPricingCard';
import { RideType } from '@/constants/enums';
import { type FinalRouteDetails } from '@/store/types/publish';
import { buildJourneyPricing } from '@/utils/journeyPricing';

interface RoutePricingSyncProps {
  routeDetails: FinalRouteDetails | null;
  rideType: RideType;
  price: number;
  minPrice: number;
  maxPrice: number;
  premiumEnabled: boolean;
  premiumPercentage: number;
  segmentPricesState: Record<string, number>;
}

export const useRoutePricingSync = ({
  routeDetails,
  rideType,
  price,
  minPrice,
  maxPrice,
  premiumEnabled,
  premiumPercentage,
  segmentPricesState,
}: RoutePricingSyncProps) =>
  useMemo(() => {
    const legs = routeDetails?.legs ?? [];
    const quote = buildJourneyPricing(
      price,
      legs,
      rideType,
      premiumEnabled,
      premiumPercentage,
      segmentPricesState,
    );
    const maximumPremium =
      buildJourneyPricing(price, legs, rideType, true, 10, segmentPricesState)
        .frontSeatPrice - price;
    const preview = buildJourneyPricing(
      price,
      legs,
      rideType,
      true,
      premiumPercentage,
      segmentPricesState,
    );
    const segments =
      rideType === RideType.LOCAL
        ? []
        : legs.map((leg, i) => ({
            id: 'seg-' + i,
            from: leg.startAddress,
            to: leg.endAddress,
            distanceKm: leg.distanceMeters / 1000,
          }));
    const segmentPrices: Record<string, SegmentPrice> = {};
    segments.forEach(segment => {
      const basePrice = quote.segmentPrices[segment.id] ?? 0;
      segmentPrices[segment.id] = {
        basePrice,
        minPrice: Math.max(0, basePrice - (price - minPrice)),
        maxPrice: basePrice + (maxPrice - price),
      };
    });

    return {
      quote,
      segments,
      segmentPrices,
      maximumPremium,
      premium: Math.max(0, preview.frontSeatPrice - price),
    };
  }, [
    routeDetails,
    rideType,
    price,
    minPrice,
    maxPrice,
    premiumEnabled,
    premiumPercentage,
    segmentPricesState,
  ]);
