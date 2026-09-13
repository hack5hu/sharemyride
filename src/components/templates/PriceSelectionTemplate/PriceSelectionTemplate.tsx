import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Button } from '@/components/atoms/Button';
import { FixedFooter } from '@/components/molecules/FixedFooter';
import { FrontSeatPremium } from '@/components/molecules/FrontSeatPremium';
import { PriceCounter } from '@/components/molecules/PriceCounter';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { type SegmentPrice } from '@/components/molecules/SegmentPricingCard';
import { SegmentPricingSheet } from '@/components/organisms/SegmentPricingSheet';
import { type StopSegment } from '@/components/organisms/SegmentPricingSheet/utils';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import * as S from './PriceSelectionTemplate.styles';

/* ── Template Props ── */
export interface PriceSelectionTemplateProps {
  price: number;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (v: number) => void;
  premiumEnabled: boolean;
  onTogglePremium: () => void;
  premium: number;
  premiumPercentage: number;
  onPremiumChange: (v: number) => void;
  onBackPress: () => void;
  onContinue: () => void;
  onCustomizePricing: () => void;
  sheetVisible: boolean;
  segments: (StopSegment & { distanceKm: number })[];
  segmentPrices: Record<string, SegmentPrice>;
  onSheetClose: () => void;
  onSaveSegmentPrices: (prices: Record<string, { basePrice: number }>) => void;
  isLoading?: boolean;
  isRecommended?: boolean;
  showPremium?: boolean;
  step?: number;
  subtitle?: string;
  badgeLabel?: string;
  canContinue?: boolean;
  maximumPremium?: number;
}

export const PriceSelectionTemplate: React.FC<PriceSelectionTemplateProps> = ({
  price,
  minPrice,
  maxPrice,
  onPriceChange,
  premiumEnabled,
  onTogglePremium,
  premium,
  premiumPercentage,
  onPremiumChange,
  onBackPress,
  onContinue,
  onCustomizePricing,
  sheetVisible,
  segments,
  segmentPrices,
  onSheetClose,
  onSaveSegmentPrices,
  isRecommended = false,
  showPremium = false,
  step = 10,
  subtitle,
  badgeLabel,
  canContinue = true,
  maximumPremium,
  isLoading = false,
}) => {
  const theme = useTheme();
  const { priceSelection: t } = useLocale();

  return (
    <ScreenShell noPaddingBottom title={t.headerTitle} onBack={onBackPress}>
      <S.MainScrollView>
        <S.TitleSection>
          <S.PageTitle>{t.title}</S.PageTitle>
          <S.PageSubtitle>{subtitle || t.subtitle}</S.PageSubtitle>
        </S.TitleSection>

        {/* Main price counter */}
        <PriceCounter
          price={price}
          onPriceChange={onPriceChange}
          label={t.basePriceLabel}
          badgeLabel={
            badgeLabel || (isRecommended ? t.recommendedBadge : undefined)
          }
          minPrice={minPrice}
          maxPrice={maxPrice}
          step={step}
        />

        {/* Front seat premium */}
        {showPremium && (
          <FrontSeatPremium
            checked={premiumEnabled}
            onToggle={onTogglePremium}
            premium={premium}
            onPremiumChange={onPremiumChange}
            basePrice={price}
            maximumPremium={maximumPremium}
            step={step}
            title={t.frontSeatPremiumTitle}
            description={t.frontSeatPremiumDesc}
            amountLabel={t.premiumAmountLabel}
            maxNote={t.maxLimitNote}
          />
        )}

        {/* Segment pricing entry row — only show if there are middle stops (more than 1 leg) */}
        {segments.length > 1 && (
          <S.SegmentRow
            onPress={onCustomizePricing}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <S.SegmentRowLeft>
              <S.SegmentIconBox>
                <MaterialIcons
                  name="route"
                  size={moderateScale(22)}
                  color={theme.colors.primary}
                />
              </S.SegmentIconBox>
              <S.SegmentTextStack>
                <S.SegmentRowTitle>{t.multiStopTitle}</S.SegmentRowTitle>
                <S.SegmentRowSub>{t.customizePricing}</S.SegmentRowSub>
              </S.SegmentTextStack>
            </S.SegmentRowLeft>
            <MaterialIcons
              name="chevron-right"
              size={moderateScale(24)}
              color={theme.colors.outline}
            />
          </S.SegmentRow>
        )}
      </S.MainScrollView>

      {/* Floating CTA */}
      <FixedFooter>
        <Button
          variant="primary"
          icon="chevron-right"
          iconPosition="right"
          onPress={onContinue}
          disabled={isLoading || !canContinue}
        >
          {t.continueButton}
        </Button>
      </FixedFooter>

      {/* ──── Modals (Rendered at root for Modal reliability) ──── */}
      <SegmentPricingSheet
        visible={sheetVisible}
        segments={segments}
        segmentPrices={segmentPrices}
        premiumEnabled={premiumEnabled}
        premiumPercentage={premiumPercentage}
        onClose={onSheetClose}
        onSave={onSaveSegmentPrices}
        t={{
          title: t.segmentSheetTitle,
          subtitle: t.segmentSheetSubtitle,
          segmentLabel: t.segmentLabel,
          minPriceLabel: t.minPriceLabel,
          maxPriceLabel: t.maxPriceLabel,
          cancelButton: t.cancelButton,
          saveButton: t.saveButton,
          frontSeatProjectedLabel: t.frontSeatProjectedLabel,
        }}
      />
    </ScreenShell>
  );
};
