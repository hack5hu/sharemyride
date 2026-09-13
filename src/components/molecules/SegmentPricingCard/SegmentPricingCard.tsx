import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { PriceCounter } from '@/components/molecules/PriceCounter';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';
import { calculateFrontSeatPrice } from '@/utils/pricing';

export interface SegmentPrice {
  basePrice: number;
  minPrice: number;
  maxPrice: number;
}

import { Card, HeaderRow, SegmentBadge, SegmentBadgeText, RouteContainer, RouteItem, Line, RouteText, PriceSection, FrontSeatSection, FrontSeatTop, FrontSeatLabelRow, FrontSeatLabel, MathBreakdown, TotalFrontSeatPrice, HelperText } from './SegmentPricingCard.styles';

/* ──── Component ──── */
export interface SegmentPricingCardProps {
  index: number;
  from: string;
  to: string;
  segmentPrice: SegmentPrice;
  onPriceChange: (price: number) => void;
  segmentLabel: string;
  premiumEnabled: boolean;
  frontSeatLabel: string;
  premiumPercentage: number;
  projectedFrontSeatPrice?: number;
}

export const SegmentPricingCard: React.FC<SegmentPricingCardProps> = ({
  index,
  from,
  to,
  segmentPrice,
  onPriceChange,
  segmentLabel,
  premiumEnabled,
  frontSeatLabel,
  premiumPercentage,
  projectedFrontSeatPrice,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  // Calculate front seat price dynamically based on current basePrice
  const totalFrontSeatPrice = projectedFrontSeatPrice ?? calculateFrontSeatPrice(
    segmentPrice.basePrice,
    premiumPercentage,
  );
  const premiumAmount = totalFrontSeatPrice - segmentPrice.basePrice;

  return (
    <Card>
      <HeaderRow>
        <SegmentBadge>
          <SegmentBadgeText>
            {segmentLabel} {String(index + 1).padStart(2, '0')}
          </SegmentBadgeText>
        </SegmentBadge>
        <RouteContainer>
          <RouteItem>
            <MaterialIcons
              name="trip-origin"
              size={moderateScale(14)}
              color={theme.colors.primary}
            />
            <RouteText numberOfLines={1}>{from}</RouteText>
          </RouteItem>
          <Line />
          <RouteItem>
            <MaterialIcons
              name="trip-origin"
              size={moderateScale(14)}
              color={theme.colors.primary}
            />
            <RouteText numberOfLines={1}> {to}</RouteText>
          </RouteItem>
        </RouteContainer>
      </HeaderRow>

      <PriceSection>
        <FrontSeatLabel>{t('priceSelection.perSeatPrice')}</FrontSeatLabel>
        <PriceCounter
          variant="compact"
          price={segmentPrice.basePrice}
          onPriceChange={onPriceChange}
          minPrice={segmentPrice.minPrice}
          maxPrice={segmentPrice.maxPrice}
          step={10}
        />
      </PriceSection>

      {premiumEnabled && (
        <FrontSeatSection>
          <FrontSeatTop>
            <FrontSeatLabelRow>
              <MaterialIcons
                name="event-seat"
                size={moderateScale(16)}
                color={theme.colors.secondary}
              />
              <FrontSeatLabel>{frontSeatLabel}</FrontSeatLabel>
            </FrontSeatLabelRow>
            <TotalFrontSeatPrice>₹{totalFrontSeatPrice}</TotalFrontSeatPrice>
          </FrontSeatTop>

          <MathBreakdown>
            ₹{segmentPrice.basePrice} + ₹{premiumAmount} = ₹
            {totalFrontSeatPrice}
          </MathBreakdown>

          <HelperText>
            {t('priceSelection.basePlusPremium', {
              percentage: Math.round(premiumPercentage),
            })}
          </HelperText>
        </FrontSeatSection>
      )}
    </Card>
  );
};
