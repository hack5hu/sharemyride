import React from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale, scale, verticalScale } from '@/styles';
import { PriceCounter } from '@/components/molecules/PriceCounter';
import { FrontSeatPremium } from '@/components/molecules/FrontSeatPremium';
import { SegmentPricingSheet } from '@/components/organisms/SegmentPricingSheet';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { PricingTier } from '@/constants/pricing';
import { SegmentPrice } from '@/components/molecules/SegmentPricingCard';
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
  segments: any[];
  segmentPrices: Record<string, SegmentPrice>;
  onSheetClose: () => void;
  onSaveSegmentPrices: (prices: Record<string, { basePrice: number }>) => void;
  isLoading?: boolean;
  isRecommended?: boolean;
  showPremium?: boolean;
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
  isLoading = false,
  isRecommended = false,
  showPremium = false,
}) => {
  const theme = useTheme();
  const { priceSelection: t } = useLocale();

  return (
      <ScreenShell
        title={'Select the Price'}
        onBack={true}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: scale(24),
            paddingBottom: verticalScale(140),
            gap: verticalScale(20),
          }}
        >
          <S.TitleSection>
            <S.PageTitle>{t.title}</S.PageTitle>
            <S.PageSubtitle>{t.subtitle}</S.PageSubtitle>
          </S.TitleSection>

          {/* Main price counter */}
          <PriceCounter
            price={price}
            onPriceChange={onPriceChange}
            label={t.basePriceLabel}
            badgeLabel={isRecommended ? t.recommendedBadge : undefined}
            minPrice={minPrice}
            maxPrice={maxPrice}
            step={10}
          />

          {/* Front seat premium */}
          {showPremium && (
            <FrontSeatPremium
              checked={premiumEnabled}
              onToggle={onTogglePremium}
              premium={premium}
              onPremiumChange={onPremiumChange}
              basePrice={price}
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
                  <MaterialIcons name="route" size={moderateScale(22)} color={theme.colors.primary} />
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
        </ScrollView>

        {/* Floating CTA */}
        <S.FloatingFooter pointerEvents="box-none">
          <S.FooterGradient
            colors={['transparent', theme.colors.surface, theme.colors.surface]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            pointerEvents="none"
          />
          <S.ContinueButton onPress={onContinue} activeOpacity={0.9} disabled={isLoading}>
            <S.ContinueGradient
              colors={[theme.colors.primary, theme.colors.primary_container]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ opacity: isLoading ? 0.6 : 1 }}
            >
              <S.ContinueText>{t.continueButton}</S.ContinueText>
              <MaterialIcons name="chevron-right" size={moderateScale(20)} color={theme.colors.on_primary} />
            </S.ContinueGradient>
          </S.ContinueButton>
        </S.FloatingFooter>
     

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
