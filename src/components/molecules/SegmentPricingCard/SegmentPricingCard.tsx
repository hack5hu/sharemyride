import React, { useCallback } from 'react';
import { TextInput, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { CounterButton } from '@/components/atoms/CounterButton';

import { PriceCounter } from '@/components/molecules/PriceCounter';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { calculateFrontSeatPrice } from '@/utils/pricing';
import { useTranslation } from '@/hooks/useTranslation';

export interface SegmentPrice {
  basePrice: number;
  minPrice: number;
  maxPrice: number;
}

/* ──── Styles ──── */
const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(16)}px;
  gap: ${verticalScale(12)}px;
`;

const HeaderRow = styled.View`
  flex-direction: column;
  align-items: flex-start;
  gap: ${scale(10)}px;
`;

const SegmentBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(6)}px;
`;

const SegmentBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(9)}px;
  color: ${({ theme }) => theme.colors.on_primary_container};
  text-transform: uppercase;
`;

const RouteContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;

const RouteItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;
const Line = styled.View`
  width: ${scale(2)}px;
  height: ${verticalScale(20)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-left: ${scale(6)}px;
`
const RouteText = styled.Text`
  flex: 1;
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
`;

const PriceSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(12)}px ${moderateScale(4)}px;
  border-radius: ${moderateScale(12)}px;
  gap: ${scale(10)}px;
`;

const PriceLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.outline};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

/* Front seat section — Using 'No-Line' rule with subtle surface variance */
const FrontSeatSection = styled.View`
  padding: ${moderateScale(14)}px;
  background-color: ${({ theme }) => `${theme.colors.secondary_container}20`};
  border-radius: ${moderateScale(12)}px;
  gap: ${verticalScale(4)}px;
`;

const FrontSeatTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FrontSeatLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

const FrontSeatLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
`;

const SeatLabel = styled.Text`
font - family: 'Plus Jakarta Sans';
font - weight: 700;
font - size: ${ responsiveFont(11) } px;
color: ${ ({ theme }) => theme.colors.secondary };
text - transform: uppercase;
`;


const MathBreakdown = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  letter-spacing: 0.2px;
`;

const TotalFrontSeatPrice = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

const HelperText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.outline};
  font-style: italic;
`;

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
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  // Calculate front seat price dynamically based on current basePrice
  const totalFrontSeatPrice = calculateFrontSeatPrice(segmentPrice.basePrice, premiumPercentage);
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
            <MaterialIcons name="trip-origin" size={moderateScale(14)} color={theme.colors.primary} />
            <RouteText numberOfLines={1}>{from}</RouteText>
          </RouteItem>
          <Line />
          <RouteItem>
            <MaterialIcons name="trip-origin" size={moderateScale(14)} color={theme.colors.primary} />
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
              <MaterialIcons name="event-seat" size={moderateScale(16)} color={theme.colors.secondary} />
              <FrontSeatLabel>{frontSeatLabel}</FrontSeatLabel>
            </FrontSeatLabelRow>
            <TotalFrontSeatPrice>₹{totalFrontSeatPrice}</TotalFrontSeatPrice>
          </FrontSeatTop>

          <MathBreakdown>
            ₹{segmentPrice.basePrice} + ₹{premiumAmount} = ₹{totalFrontSeatPrice}
          </MathBreakdown>

          <HelperText>
            {t('priceSelection.basePlusPremium', { percentage: Math.round(premiumPercentage) })}
          </HelperText>
        </FrontSeatSection>
      )}
    </Card>
  );
};
