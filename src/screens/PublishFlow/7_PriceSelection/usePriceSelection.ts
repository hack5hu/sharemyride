import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { locationService } from '@/serviceManager/locationService';
import { calculateBasePrice, calculateFrontSeatPrice, PRICING_MULTIPLIERS, roundToNearest } from '@/utils/pricing';
import { SegmentPrice } from '@/components/molecules/SegmentPricingCard';
import { StopSegment } from '@/components/organisms/SegmentPricingSheet/utils';

export const usePriceSelection = () => {
  const navigation = useNavigation();
// removed unused route

  const { 
    startLocation, 
    destinationLocation, 
    middleStops,
    routeDetails,
    setRouteDetails,
    publishVehicleType,
    setPricing,
    selectedSeatIds,
    price: storePrice,
    premiumEnabled: storePremiumEnabled,
    premiumPercentage: storePremiumPercentage,
    segmentPrices: storeSegmentPrices,
  } = useRidePublishStore();

  const divisor = useMemo(() => (publishVehicleType === '7' ? 6 : 4), [publishVehicleType]);

  const [isLoading, setIsLoading] = useState(false);
  const totalDistanceKm = (routeDetails?.totalDistanceMeters || 0) / 1000;

  const initialPrice = useMemo(() => {
    if (totalDistanceKm > 0) {
      return calculateBasePrice(totalDistanceKm, PRICING_MULTIPLIERS.MID, divisor);
    }
    return 0;
  }, [totalDistanceKm, divisor]);

  const showPremium = useMemo(() => {
    console.log("Selected seat IDs", selectedSeatIds);
    return (
      selectedSeatIds.includes(2)
    );
  }, [selectedSeatIds]);

  const [price, setPrice] = useState<number>(storePrice || initialPrice);
  const [premiumEnabled, setPremiumEnabled] = useState(storePremiumEnabled ?? false);
  const [premiumPercentage, setPremiumPercentage] = useState(storePremiumPercentage || 10);
  const [sheetVisible, setSheetVisible] = useState(false);
  
  const [segmentPricesState, setSegmentPricesState] = useState<Record<string, number>>(storeSegmentPrices || {});

  // Pricing Boundaries (7x to 12x) - Adjusted for Vehicle Capacity
  const minPrice = useMemo(() => calculateBasePrice(totalDistanceKm, PRICING_MULTIPLIERS.MIN, divisor), [totalDistanceKm, divisor]);
  const maxPrice = useMemo(() => calculateBasePrice(totalDistanceKm, PRICING_MULTIPLIERS.MAX, divisor), [totalDistanceKm, divisor]);

  // 1. Fetch Finalized Route on Mount
  useEffect(() => {
    const fetchFinalRoute = async () => {
      if (!startLocation || !destinationLocation) return;
      
      // If we have route details and price is already in store or set correctly, skip
      if (routeDetails && (storePrice > 0 || price > 0)) {
        // Just sync segment prices if store is empty but we have legs
        if (Object.keys(segmentPricesState).length === 0 && routeDetails.legs.length > 0) {
           const initialSegmentPrices: Record<string, number> = {};
           routeDetails.legs.forEach((leg, i) => {
             const segId = `seg-${i}`;
             initialSegmentPrices[segId] = calculateBasePrice(leg.distanceMeters / 1000, PRICING_MULTIPLIERS.MID, divisor);
           });
           setSegmentPricesState(initialSegmentPrices);
        }
        return;
      }
      
      // Update price if it was 0 but we have details (redundancy fix)
      if (routeDetails && price === 0 && initialPrice > 0) {
        setPrice(initialPrice);
      }

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

          // Initialize prices based on recommendation multiplier
          const totalKm = details.totalDistanceMeters / 1000;
          const calculatedPrice = calculateBasePrice(totalKm, PRICING_MULTIPLIERS.MID, divisor);
          setPrice(calculatedPrice);

          const initialSegmentPrices: Record<string, number> = {};
          legs.forEach((leg, i) => {
            const segId = `seg-${i}`;
            initialSegmentPrices[segId] = calculateBasePrice(leg.distanceMeters / 1000, PRICING_MULTIPLIERS.MID, divisor);
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
  }, [startLocation, destinationLocation, middleStops, routeDetails, setRouteDetails, price, divisor, initialPrice, segmentPricesState, storePrice]);

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
      const basePrice = segmentPricesState[seg.id] || calculateBasePrice(seg.distanceKm, PRICING_MULTIPLIERS.MID, divisor);
      
      // Front seat pricing logic for segments: basePrice + calculated premium based on shared percentage
      const legFrontSeatPrice = calculateFrontSeatPrice(basePrice, premiumPercentage);

      prices[seg.id] = {
        basePrice,
        frontSeatPrice: legFrontSeatPrice,
        minPrice: calculateBasePrice(seg.distanceKm, PRICING_MULTIPLIERS.MIN, divisor),
        maxPrice: calculateBasePrice(seg.distanceKm, PRICING_MULTIPLIERS.MAX, divisor),
      } as any;
    });
    return prices;
  }, [segments, segmentPricesState, premiumPercentage, divisor]);

  // Handlers
  const handlePriceChange = useCallback((v: number) => {
    setPrice(v);
  }, []);

  const handleTogglePremium = useCallback(() => {
    setPremiumEnabled((prev) => !prev);
  }, []);

  const handlePremiumChange = useCallback((v: number) => {
    const basePrice = Number(price) || 1; 
    // Calculate required percentage to reach the desired currency amount
    const percentage = (v / basePrice) * 100;
    // Allow for more precision to satisfy step changes in small amounts
    setPremiumPercentage(Math.min(Number(percentage.toFixed(2)), 10));
  }, [price]);

  const handleBackPress = useCallback(() => {
    const basePriceNum = Number(price) || 0;
    const premiumPctNum = Number(premiumPercentage) || 0;
    const frontSeatPrice = premiumEnabled ? roundToNearest(basePriceNum * (1 + premiumPctNum / 100), 10) : basePriceNum;

    setPricing({
      price: basePriceNum,
      fullJourneyPrice: basePriceNum,
      frontSeatPrice,
      premiumEnabled: showPremium ? premiumEnabled : false,
      premiumPercentage: premiumPctNum,
      segmentPrices: segmentPricesState,
    });
    navigation.goBack();
  }, [navigation, setPricing, price, premiumEnabled, premiumPercentage, segmentPricesState, showPremium]);

  const handleContinue = useCallback(() => {
    const basePriceNum = Number(price) || 0;
    const premiumPctNum = Number(premiumPercentage) || 0;
    const frontSeatPrice = premiumEnabled ? roundToNearest(basePriceNum * (1 + premiumPctNum / 100), 10) : basePriceNum;
    
    setPricing({
      price: basePriceNum,
      fullJourneyPrice: basePriceNum,
      frontSeatPrice: frontSeatPrice,
      premiumEnabled: showPremium ? premiumEnabled : false,
      premiumPercentage,
      segmentPrices: segmentPricesState,
    });

    (navigation.navigate as any)('SummaryPublish');
  }, [navigation, setPricing, price, premiumEnabled, premiumPercentage, segmentPricesState, showPremium]);

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
    const recommendedMid = calculateBasePrice(totalDistanceKm, PRICING_MULTIPLIERS.MID, divisor);
    const tolerance = recommendedMid * 0.15;
    return Math.abs(price - recommendedMid) <= tolerance;
  }, [price, totalDistanceKm, divisor]);

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
    showPremium,
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
