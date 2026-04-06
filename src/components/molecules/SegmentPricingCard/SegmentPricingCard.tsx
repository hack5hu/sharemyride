import React, { useCallback } from 'react';
import { TextInput, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { CounterButton } from '@/components/atoms/CounterButton';

export interface SegmentPrice {
  segmentId: string;
  min: number;
  max: number;
}

/* ──── Styles ──── */
const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(16)}px;
`;

const HeaderRow = styled.View`
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${verticalScale(14)}px;
`;

const SegmentBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 9999px;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 1px;
  shadow-opacity: 0.06;
  shadow-radius: 2px;
  elevation: 1;
`;

const SegmentBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const RouteText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.outline};
`;

const InputRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
  gap: ${scale(8)}px;
`;

const InputGroup = styled.View`flex: 1;`;

const InputLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.outline_variant};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: ${verticalScale(6)}px;
`;

const PriceControlRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
  border-radius: ${moderateScale(10)}px;
  padding-horizontal: ${scale(4)}px;
  height: ${moderateScale(48)}px;
`;

const PriceValue = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding:12px 20px;
  border-radius:12px;
`;

const Separator = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.outline_variant};
  padding-bottom: ${verticalScale(12)}px;
  font-weight: 500;
`;

/* Front seat row — shown conditionally */
const FrontSeatRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${verticalScale(12)}px;
  padding-top: ${verticalScale(10)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => `${theme.colors.outline_variant}1A`};
`;

const FrontSeatLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.outline};
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

const FrontSeatValue = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

/* ──── Component ──── */
export interface SegmentPricingCardProps {
  index: number;
  from: string;
  to: string;
  segmentPrice: SegmentPrice;
  onChange: (updated: SegmentPrice) => void;
  segmentLabel: string;
  minLabel: string;
  maxLabel: string;
  premiumEnabled: boolean;
  basePrice: number;
  frontSeatLabel: string;
}

const calcFrontSeatPrice = (min: number, basePrice: number): number =>
  min + Math.round(basePrice * 0.1 / 10) * 10;

export const SegmentPricingCard: React.FC<SegmentPricingCardProps> = ({
  index,
  from,
  to,
  segmentPrice,
  onChange,
  segmentLabel,
  minLabel,
  maxLabel,
  premiumEnabled,
  basePrice,
  frontSeatLabel,
}) => {
  const theme = useTheme();
  const frontSeatPrice = calcFrontSeatPrice(segmentPrice.min, basePrice);

  const STEP = 10;

  const handleMinDec = useCallback(() => {
    onChange({ ...segmentPrice, min: Math.max(0, segmentPrice.min - STEP) });
  }, [segmentPrice, onChange]);

  const handleMinInc = useCallback(() => {
    onChange({ ...segmentPrice, min: segmentPrice.min + STEP });
  }, [segmentPrice, onChange]);

  const handleMaxDec = useCallback(() => {
    onChange({ ...segmentPrice, max: Math.max(0, segmentPrice.max - STEP) });
  }, [segmentPrice, onChange]);

  const handleMaxInc = useCallback(() => {
    onChange({ ...segmentPrice, max: segmentPrice.max + STEP });
  }, [segmentPrice, onChange]);

  return (
    <Card>
      <HeaderRow>
        <SegmentBadge>
          <SegmentBadgeText>
            {segmentLabel} {String(index + 1).padStart(2, '0')}
          </SegmentBadgeText>
        </SegmentBadge>
        <RouteText>{from} → {to}</RouteText>
      </HeaderRow>

      <InputRow>
        <InputGroup>
          <PriceControlRow>
            <CounterButton type="remove" onPress={handleMaxDec} disabled={segmentPrice.max <= 0} />
            <PriceValue>₹{segmentPrice.max}</PriceValue>
            <CounterButton type="add" onPress={handleMaxInc} />
          </PriceControlRow>
        </InputGroup>
      </InputRow>

      {premiumEnabled && (
        <FrontSeatRow>
          <FrontSeatLabel>{frontSeatLabel}</FrontSeatLabel>
          <FrontSeatValue>₹{frontSeatPrice}</FrontSeatValue>
        </FrontSeatRow>
      )}
    </Card>
  );
};
