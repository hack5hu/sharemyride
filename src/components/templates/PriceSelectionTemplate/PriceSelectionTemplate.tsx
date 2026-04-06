import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'styled-components/native';
import styled from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { PriceCounter } from '@/components/molecules/PriceCounter';
import { FrontSeatPremium } from '@/components/molecules/FrontSeatPremium';
import { SegmentPricingSheet, StopSegment } from '@/components/organisms/SegmentPricingSheet';
import { SegmentPrice } from '@/components/molecules/SegmentPricingCard';
import { ReportIssueModal } from '@/components/organisms/ReportIssueModal';

/* ── Styled Components ── */
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(14)}px;
  gap: ${scale(16)}px;
`;

const BackButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
  border-radius: 9999px;
`;

const HeaderTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

const TitleSection = styled.View`
  margin-bottom: ${verticalScale(24)}px;
`;

const PageTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(24)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
  margin-bottom: ${verticalScale(6)}px;
`;

const PageSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(20)}px;
`;

/* Multi-stop entry row — opens the sheet */
const SegmentRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(16)}px;
`;

const SegmentRowLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(14)}px;
`;

const SegmentIconBox = styled.View`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  align-items: center;
  justify-content: center;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 1px;
  shadow-opacity: 0.06;
  shadow-radius: 2px;
  elevation: 1;
`;

const SegmentRowTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

const SegmentRowSub = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.outline};
  margin-top: ${verticalScale(2)}px;
`;

const SegmentTextStack = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

/* Floating footer */
const FloatingFooter = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(32)}px;
`;

const FooterGradient = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: -${verticalScale(48)}px;
`;

const ContinueButton = styled.TouchableOpacity`
  width: 100%;
`;

const ContinueGradient = styled(LinearGradient)`
  width: 100%;
  height: ${moderateScale(56)}px;
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.25;
  shadow-radius: 24px;
  elevation: 8;
`;

const ContinueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  letter-spacing: 0.3px;
`;

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
      <Container edges={['top']}>
        {/* Header — no step indicator */}
        <Header>
          <BackButton onPress={onBackPress} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={moderateScale(24)} color={theme.colors.primary} />
          </BackButton>
          <HeaderTitle>{t.headerTitle}</HeaderTitle>
        </Header>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: scale(24),
            paddingBottom: verticalScale(140),
            gap: verticalScale(20),
          }}
        >
          <TitleSection>
            <PageTitle>{t.title}</PageTitle>
            <PageSubtitle>{t.subtitle}</PageSubtitle>
          </TitleSection>

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
          <SegmentRow
            onPress={onCustomizePricing}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <SegmentRowLeft>
              <SegmentIconBox>
                <MaterialIcons name="route" size={moderateScale(22)} color={theme.colors.primary} />
              </SegmentIconBox>
              <SegmentTextStack>
                <SegmentRowTitle>{t.multiStopTitle}</SegmentRowTitle>
                <SegmentRowSub>{t.customizePricing}</SegmentRowSub>
              </SegmentTextStack>
            </SegmentRowLeft>
            <MaterialIcons
              name="chevron-right"
              size={moderateScale(24)}
              color={theme.colors.outline}
            />
          </SegmentRow>
        </ScrollView>

        {/* Floating CTA */}
        <FloatingFooter pointerEvents="box-none">
          <FooterGradient
            colors={['transparent', theme.colors.surface, theme.colors.surface]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            pointerEvents="none"
          />
          <ContinueButton onPress={onContinue} activeOpacity={0.9}>
            <ContinueGradient
              colors={[theme.colors.primary, theme.colors.primary_container]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ContinueText>{t.continueButton}</ContinueText>
              <MaterialIcons name="chevron-right" size={moderateScale(20)} color={theme.colors.on_primary} />
            </ContinueGradient>
          </ContinueButton>
        </FloatingFooter>
      </Container>


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
