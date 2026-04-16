import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { locationService } from '@/serviceManager/locationService';
import { PricingTier } from '@/constants/pricing';
import { calculateBasePrice, calculateFrontSeatPrice, PRICING_MULTIPLIERS, roundToNearest } from '@/utils/pricing';
import { SegmentPrice } from '@/components/molecules/SegmentPricingCard';
import { buildSegments, StopSegment } from '@/components/organisms/SegmentPricingSheet/utils';

export const usePriceSelection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as any;
  const returnTo = params?.returnTo;

  const { 
    startLocation, 
    destinationLocation, 
    middleStops,
    routeDetails,
    setRouteDetails,
    seatCount,
    setPricing
  } = useRidePublishStore();

  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [premiumEnabled, setPremiumEnabled] = useState(true);
  const [premiumPercentage, setPremiumPercentage] = useState(10); // 10% default
  const [sheetVisible, setSheetVisible] = useState(false);
  
  const [segmentPricesState, setSegmentPricesState] = useState<Record<string, number>>({});

  const totalDistanceKm = (routeDetails?.totalDistanceMeters || 0) / 1000;

  // Pricing Boundaries (7x to 12x) - Adjusted for Seat Count
  const minPrice = useMemo(() => calculateBasePrice(totalDistanceKm, PRICING_MULTIPLIERS.MIN, seatCount), [totalDistanceKm, seatCount]);
  const maxPrice = useMemo(() => calculateBasePrice(totalDistanceKm, PRICING_MULTIPLIERS.MAX, seatCount), [totalDistanceKm, seatCount]);

  // 1. Fetch Finalized Route on Mount
  useEffect(() => {
    const fetchFinalRoute = async () => {
      if (!startLocation || !destinationLocation) return;
      
      // If we have route details and price is already set correctly, skip
      if (routeDetails && price > 0) return;

      setIsLoading(true);
      try {
        // Waypoints must be in the sorted order
        const waypoints = middleStops.length > 0 
          ? middleStops.map(s => `${s.latitude},${s.longitude}`).join('|')
          : undefined;

        const results = await locationService.getDirections(
          startLocation.latitude,
          startLocation.longitude,
          destinationLocation.latitude,
          destinationLocation.longitude,
          waypoints
        );

        if (results && results.length > 0) {
          const mainRoute = results[0];
          const legs = mainRoute.legs?.map((leg, i) => ({
            distanceMeters: leg.distance,
            durationSeconds: leg.duration,
            startAddress: i === 0 ? startLocation.name : middleStops[i-1].name,
            endAddress: i === (mainRoute.legs?.length || 0) - 1 ? destinationLocation.name : middleStops[i].name
          })) || [];

          const details = {
            totalDistanceMeters: mainRoute.distance ?? legs.reduce((acc, leg) => acc + leg.distanceMeters, 0),
            totalDurationSeconds: mainRoute.duration ?? legs.reduce((acc, leg) => acc + leg.durationSeconds, 0),
            legs
          };
          setRouteDetails(details);

          // Initialize prices based on 10x multiplier
          const totalKm = details.totalDistanceMeters / 1000;
          setPrice(calculateBasePrice(totalKm, PRICING_MULTIPLIERS.MID, seatCount));

          const initialSegmentPrices: Record<string, number> = {};
          legs.forEach((leg, i) => {
            const segId = `seg-${i}`;
            initialSegmentPrices[segId] = calculateBasePrice(leg.distanceMeters / 1000, PRICING_MULTIPLIERS.MID, seatCount);
          });
          setSegmentPricesState(initialSegmentPrices);
        }
      } catch (error) {
        console.error('Failed to fetch pricing route:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFinalRoute();
  }, [startLocation, destinationLocation, middleStops, routeDetails, setRouteDetails, price, seatCount]);

  // 2. Pricing Calculations (Premium)
  const premium = useMemo(() => {
    const frontSeatPrice = calculateFrontSeatPrice(price, premiumPercentage);
    return frontSeatPrice - price;
  }, [price, premiumPercentage]);

  const segments: StopSegment[] = useMemo(() => {
    if (!routeDetails) return [];
    return routeDetails.legs.map((leg, i) => ({
      id: `seg-${i}`,
      from: leg.startAddress,
      to: leg.endAddress,
      distanceKm: leg.distanceMeters / 1000
    })) as any;
  }, [routeDetails]);

  // Segment values for the sheet
  const segmentPrices: Record<string, SegmentPrice> = useMemo(() => {
    const prices: Record<string, SegmentPrice> = {};
    segments.forEach((seg: any) => {
      const basePrice = segmentPricesState[seg.id] || calculateBasePrice(seg.distanceKm, PRICING_MULTIPLIERS.MID, seatCount);
      
      // Front seat pricing logic for segments: basePrice + calculated premium based on shared percentage
      const legFrontSeatPrice = calculateFrontSeatPrice(basePrice, premiumPercentage);

      prices[seg.id] = {
        basePrice,
        frontSeatPrice: legFrontSeatPrice,
        minPrice: calculateBasePrice(seg.distanceKm, PRICING_MULTIPLIERS.MIN, seatCount),
        maxPrice: calculateBasePrice(seg.distanceKm, PRICING_MULTIPLIERS.MAX, seatCount),
      } as any;
    });
    return prices;
  }, [segments, segmentPricesState, premiumPercentage, seatCount]);

  // Handlers
  const handlePriceChange = useCallback((v: number) => {
    setPrice(v);
  }, []);

  const handleTogglePremium = useCallback(() => {
    setPremiumEnabled((prev) => !prev);
  }, []);

  const handlePremiumChange = useCallback((v: number) => {
    // v is the premium amount (v = frontSeatPrice - basePrice)
    const basePrice = price || 1; 
    const percentage = ((v) / basePrice) * 100;
    setPremiumPercentage(Math.round(Math.min(percentage, 10)));
  }, [price]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleContinue = useCallback(() => {
    setPricing({
      price,
      premiumEnabled,
      premiumPercentage,
      segmentPrices: segmentPricesState,
    });
    if (returnTo === 'SummaryPublish') {
      (navigation.navigate as any)('SummaryPublish');
    } else {
      (navigation.navigate as any)('RequestType');
    }
  }, [navigation, setPricing, price, premiumEnabled, premiumPercentage, segmentPricesState, returnTo]);

  const handleCustomizePricing = useCallback(() => {
    setSheetVisible(true);
  }, []);

  const handleSheetClose = useCallback(() => {
    setSheetVisible(false);
  }, []);

  const handleSaveSegmentPrices = useCallback((prices: Record<string, { basePrice: number }>) => {
    setSegmentPricesState(prev => {
      const next = { ...prev };
      Object.keys(prices).forEach(id => {
        next[id] = prices[id].basePrice;
      });
      return next;
    });
  }, []);

  // Recommended logic: price within +/- 15% of SID suggestion
  const isRecommended = useMemo(() => {
    const recommendedMid = calculateBasePrice(totalDistanceKm, PRICING_MULTIPLIERS.MID, seatCount);
    const tolerance = recommendedMid * 0.15;
    return Math.abs(price - recommendedMid) <= tolerance;
  }, [price, totalDistanceKm, seatCount]);

  return {
    price,
    minPrice,
    maxPrice,
    isRecommended,
    premiumEnabled,
    premium,
    premiumPercentage,
    sheetVisible,
    segments,
    segmentPrices,
    projectedFrontSeatPrice: price + premium,
    isLoading,
    handlePriceChange,
    handleTogglePremium,
    handlePremiumChange,
    handleBackPress,
    handleContinue,
    handleCustomizePricing,
    handleSheetClose,
    handleSaveSegmentPrices,
  };
};
