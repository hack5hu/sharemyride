import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SegmentPrice } from '@/components/molecules/SegmentPricingCard';
import { buildSegments, StopSegment } from '@/components/organisms/SegmentPricingSheet/utils';

const RECOMMENDED_PRICE = 450;
const INITIAL_PREMIUM = 45;

// Static mock stops — in production these come from the MiddleStops flow
const MOCK_STOPS = [
  { id: '1', name: 'Marathahalli Bridge' },
  { id: '2', name: 'Varthur Kodi' },
];
const MOCK_START = 'Indiranagar Metro Station';
const MOCK_DESTINATION = 'Whitefield ITPL';

export const usePriceSelection = () => {
  const navigation = useNavigation();

  const [price, setPrice] = useState(RECOMMENDED_PRICE);
  const [premiumEnabled, setPremiumEnabled] = useState(true);
  const [premium, setPremium] = useState(INITIAL_PREMIUM);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [segmentPrices, setSegmentPrices] = useState<Record<string, SegmentPrice>>({});

  const segments: StopSegment[] = buildSegments(MOCK_START, MOCK_STOPS, MOCK_DESTINATION);

  const handlePriceChange = useCallback((v: number) => {
    setPrice(v);
    // Re-clamp premium when base price changes
    const maxPremium = Math.floor(v * 0.1);
    if (premium > maxPremium) setPremium(Math.max(5, maxPremium));
  }, [premium]);

  const handleTogglePremium = useCallback(() => {
    setPremiumEnabled((prev) => !prev);
  }, []);

  const handlePremiumChange = useCallback((v: number) => {
    setPremium(v);
  }, []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleContinue = useCallback(() => {
    navigation.navigate('RequestType' as any);
  }, [navigation]);

  const handleCustomizePricing = useCallback(() => {
    setSheetVisible(true);
  }, []);

  const handleSheetClose = useCallback(() => {
    setSheetVisible(false);
  }, []);

  const handleSaveSegmentPrices = useCallback((prices: Record<string, SegmentPrice>) => {
    setSegmentPrices(prices);
  }, []);

  const projectedFrontSeatPrice = premium + price;

  return {
    price,
    premiumEnabled,
    premium,
    sheetVisible,
    segments,
    segmentPrices,
    projectedFrontSeatPrice,
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
