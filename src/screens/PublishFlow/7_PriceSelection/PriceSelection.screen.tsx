import React from 'react';
import { PriceSelectionTemplate } from '@/components/templates/PriceSelectionTemplate';
import { usePriceSelection } from './usePriceSelection';

export const PriceSelectionScreen: React.FC = () => {
  const {
    price,
    premiumEnabled,
    premium,
    sheetVisible,
    segments,
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
      onPriceChange={handlePriceChange}
      premiumEnabled={premiumEnabled}
      onTogglePremium={handleTogglePremium}
      premium={premium}
      onPremiumChange={handlePremiumChange}
      onBackPress={handleBackPress}
      onContinue={handleContinue}
      onCustomizePricing={handleCustomizePricing}
      sheetVisible={sheetVisible}
      segments={segments}
      onSheetClose={handleSheetClose}
      onSaveSegmentPrices={handleSaveSegmentPrices}
    />
  );
};
