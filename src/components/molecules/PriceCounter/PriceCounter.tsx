import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { CounterButton } from '@/components/atoms/CounterButton';

const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(32)}px ${scale(24)}px;
  align-items: center;
  shadow-color: rgb(23,29,25);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 24px;
  elevation: 2;
  gap: ${verticalScale(20)}px;
`;

const PriceLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(24)}px;
`;

const PriceText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(52)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -2px;
  min-width: ${scale(110)}px;
  text-align: center;
`;

const RecommendedBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme }) => `${theme.colors.primary_fixed}4D`};
  padding-horizontal: ${scale(14)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: 9999px;
`;

const BadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_primary_fixed_variant};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const STEP = 50;
const MIN_PRICE = 50;
const MAX_PRICE = 2000;

export interface PriceCounterProps {
  price: number;
  onPriceChange: (price: number) => void;
  label: string;
  badgeLabel: string;
}

export const PriceCounter: React.FC<PriceCounterProps> = ({
  price,
  onPriceChange,
  label,
  badgeLabel,
}) => {
  const theme = useTheme();

  const handleDecrement = () => onPriceChange(Math.max(MIN_PRICE, price - STEP));
  const handleIncrement = () => onPriceChange(Math.min(MAX_PRICE, price + STEP));

  return (
    <Card>
      <PriceLabel>{label}</PriceLabel>
      <PriceRow>
        <CounterButton type="remove" onPress={handleDecrement} disabled={price <= MIN_PRICE} />
        <PriceText>₹{price}</PriceText>
        <CounterButton type="add" onPress={handleIncrement} disabled={price >= MAX_PRICE} />
      </PriceRow>
      <RecommendedBadge>
        <MaterialIcons name="verified" size={moderateScale(16)} color={theme.colors.on_primary_fixed_variant} />
        <BadgeText>{badgeLabel}</BadgeText>
      </RecommendedBadge>
    </Card>
  );
};
