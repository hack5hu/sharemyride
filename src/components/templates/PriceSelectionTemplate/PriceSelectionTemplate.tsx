import React from 'react';
import { ScrollView, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale, scale, verticalScale } from '@/styles';
import { PriceCounter } from '@/components/molecules/PriceCounter';
import { FrontSeatPremium } from '@/components/molecules/FrontSeatPremium';
import { SegmentPricingSheet, StopSegment } from '@/components/organisms/SegmentPricingSheet';
import { SegmentPrice } from '@/components/molecules/SegmentPricingCard';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './PriceSelectionTemplate.styles';

/* ── Template Props ── */
export interface PriceSelectionTemplateProps {
  price: number;
  onPriceChange: (v: number) => void;
  premiumEnabled: boolean;
  onTogglePremium: () => void;
  premium: number;
  onPremiumChange: (v: number) => void;
  onBackPress: () => void;
  onContinue: () => void;
  onCustomizePricing: () => void;
  sheetVisible: boolean;
  segments: StopSegment[];
  onSheetClose: () => void;
  onSaveSegmentPrices: (prices: Record<string, SegmentPrice>) => void;
}

export const PriceSelectionTemplate: React.FC<PriceSelectionTemplateProps> = ({
  price,
  onPriceChange,
  premiumEnabled,
  onTogglePremium,
  premium,
  onPremiumChange,
  onBackPress,
  onContinue,
  onCustomizePricing,
  sheetVisible,
  segments,
  onSheetClose,
  onSaveSegmentPrices,
}) => {
  const theme = useTheme();
  const { priceSelection: t } = useLocale();

  return (
    <View style={{ flex: 1 }}>
      <ScreenShell
        title={t.headerTitle}
        onBack={onBackPress}
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
            badgeLabel={t.recommendedBadge}
          />

          {/* Front seat premium */}
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

          {/* Segment pricing entry row — opens the sheet */}
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
        </ScrollView>

        {/* Floating CTA */}
        <S.FloatingFooter pointerEvents="box-none">
          <S.FooterGradient
            colors={['transparent', theme.colors.surface, theme.colors.surface]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            pointerEvents="none"
          />
          <S.ContinueButton onPress={onContinue} activeOpacity={0.9}>
            <S.ContinueGradient
              colors={[theme.colors.primary, theme.colors.primary_container]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <S.ContinueText>{t.continueButton}</S.ContinueText>
              <MaterialIcons name="chevron-right" size={moderateScale(20)} color={theme.colors.on_primary} />
            </S.ContinueGradient>
          </S.ContinueButton>
        </S.FloatingFooter>
      </ScreenShell>

      {/* ──── Modals (Rendered at root for Modal reliability) ──── */}
      <SegmentPricingSheet
        visible={sheetVisible}
        segments={segments}
        basePrice={price}
        premiumEnabled={premiumEnabled}
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
    </View>
  );
};
