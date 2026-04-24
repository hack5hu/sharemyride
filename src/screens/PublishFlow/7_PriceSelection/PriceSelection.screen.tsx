import React from 'react';
import { PriceSelectionTemplate } from '@/components/templates/PriceSelectionTemplate';
import { usePriceSelection } from './usePriceSelection';

export const PriceSelectionScreen: React.FC = () => {
  const {
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
  } = usePriceSelection();

  return (
    <PriceSelectionTemplate
      price={price}
      minPrice={minPrice}
      maxPrice={maxPrice}
      isRecommended={isRecommended}
      onPriceChange={handlePriceChange}
      premiumEnabled={premiumEnabled}
      onTogglePremium={handleTogglePremium}
      premium={premium}
      premiumPercentage={premiumPercentage}
      onPremiumChange={handlePremiumChange}
      onBackPress={handleBackPress}
      onContinue={handleContinue}
      onCustomizePricing={handleCustomizePricing}
      sheetVisible={sheetVisible}
      segments={segments}
      segmentPrices={segmentPrices}
      onSheetClose={handleSheetClose}
      onSaveSegmentPrices={handleSaveSegmentPrices}
      isLoading={isLoading}
      showPremium={showPremium}
    />
  );
};
