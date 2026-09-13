import { type RouteProp, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType, RideType } from '@/constants/enums';
import { PricingBound } from '@/constants/pricingPolicy';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { type RootStackParamList } from '@/navigation/types';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import {
  isValidJourneyPrice,
  premiumPercentageForAmount,
} from '@/utils/journeyPricing';
import { calculateSmartPrice, isRecommendedPrice } from '@/utils/pricing';
import { isPublishRouteValid } from '@/utils/publishRouteValidation';
import { useRoutePricingSync } from './utils/useRoutePricingSync';

export const usePriceSelection = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'PriceSelection'>>();
  const { t } = useTranslation();
  const rideType = useRidePublishStore(s => s.rideType);
  const routeDetails = useRidePublishStore(s => s.routeDetails);
  const selectedRoute = useRidePublishStore(s => s.selectedRoute);
  const middleStops = useRidePublishStore(s => s.middleStops);
  const seater = useRidePublishStore(s => s.publishVehicleType);
  const storePrice = useRidePublishStore(s => s.price);
  const storePremium = useRidePublishStore(s => s.premiumEnabled);
  const storePercentage = useRidePublishStore(s => s.premiumPercentage);
  const storeSegments = useRidePublishStore(s => s.segmentPrices);
  const setPricing = useRidePublishStore(s => s.setPricing);
  const isLocal = rideType === RideType.LOCAL;
  const distanceKm = (routeDetails?.totalDistanceMeters ?? 0) / 1000;
  const recommended = calculateSmartPrice(
    distanceKm,
    rideType,
    PricingBound.MID,
    seater,
  );
  const minPrice = calculateSmartPrice(
    distanceKm,
    rideType,
    PricingBound.MIN,
    seater,
  );
  const maxPrice = calculateSmartPrice(
    distanceKm,
    rideType,
    PricingBound.MAX,
    seater,
  );
  const validPrice = isValidJourneyPrice(
    storePrice,
    distanceKm,
    rideType,
    seater,
  )
    ? storePrice
    : recommended;
  const [price, setPrice] = useState(validPrice);
  const [premiumEnabled, setPremiumEnabled] = useState(storePremium);
  const [premiumPercentage, setPremiumPercentage] = useState(storePercentage);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [customSegments, setCustomSegments] = useState({
    route: routeDetails,
    values: storeSegments,
  });
  useEffect(() => {
    setPrice(validPrice);
  }, [validPrice, routeDetails, rideType, seater]);
  const segmentPricesState = useMemo(
    () => (customSegments.route === routeDetails ? customSegments.values : {}),
    [customSegments, routeDetails],
  );
  const { quote, premium, maximumPremium, segments, segmentPrices } =
    useRoutePricingSync({
      routeDetails,
      rideType,
      price,
      minPrice,
      maxPrice,
      premiumEnabled,
      premiumPercentage,
      segmentPricesState,
    });
  const canContinue =
    !!selectedRoute?.polylineString &&
    isPublishRouteValid(
      routeDetails,
      rideType,
      isLocal ? 2 : middleStops.length + 2,
    ) &&
    isValidJourneyPrice(price, distanceKm, rideType, seater);
  const notifyInvalid = useCallback(
    () =>
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        t('notification.defaultErrorMessage'),
      ),
    [t],
  );
  const handlePriceChange = useCallback(
    (value: number) => {
      setPrice(value);
      setCustomSegments({ route: routeDetails, values: {} });
    },
    [routeDetails],
  );
  const handleTogglePremium = useCallback(
    () => setPremiumEnabled(value => !value),
    [],
  );
  const handlePremiumChange = useCallback(
    (value: number) =>
      setPremiumPercentage(
        premiumPercentageForAmount(
          value,
          price,
          routeDetails?.legs ?? [],
          segmentPricesState,
          rideType,
        ),
      ),
    [price, routeDetails, segmentPricesState, rideType],
  );
  const handleBackPress = useCallback(() => {
    if (canContinue) setPricing(quote);
    navigation.goBack();
  }, [canContinue, setPricing, quote, navigation]);
  const handleContinue = useCallback(() => {
    if (!canContinue) {
      notifyInvalid();

      return;
    }
    setPricing(quote);
    navigation.navigate(route.params?.returnTo ?? 'SummaryPublish');
  }, [canContinue, notifyInvalid, setPricing, quote, navigation, route.params]);
  const handleCustomizePricing = useCallback(() => setSheetVisible(true), []);
  const handleSheetClose = useCallback(() => setSheetVisible(false), []);
  const handleSaveSegmentPrices = useCallback(
    (prices: Record<string, { basePrice: number }>) => {
      const values = Object.fromEntries(
        segments.map(segment => [segment.id, prices[segment.id]?.basePrice]),
      );
      const amounts = Object.values(values);
      const total = amounts.reduce((sum, value) => sum + value, 0);
      if (
        amounts.some(value => !Number.isInteger(value) || value < 0) ||
        !isValidJourneyPrice(total, distanceKm, rideType, seater)
      ) {
        notifyInvalid();

        return;
      }
      setCustomSegments({ route: routeDetails, values });
      setPrice(total);
      setSheetVisible(false);
    },
    [segments, distanceKm, rideType, seater, notifyInvalid, routeDetails],
  );

  return {
    price,
    minPrice,
    maxPrice,
    premiumEnabled,
    premium,
    premiumPercentage,
    maximumPremium,
    sheetVisible,
    segments,
    segmentPrices,
    canContinue,
    isLoading: false,
    showPremium: true,
    step: isLocal ? 5 : 10,
    subtitle: t(
      isLocal ? 'priceSelection.intracitySubtitle' : 'priceSelection.subtitle',
    ),
    badgeLabel: isLocal
      ? t('priceSelection.intracityBadge')
      : isRecommendedPrice(price, recommended)
      ? t('priceSelection.recommendedBadge')
      : undefined,
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
