import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { CounterButton } from '@/components/atoms/CounterButton';



export interface PriceCounterProps {
  price: number;
  onPriceChange: (price: number) => void;
  label?: string;
  badgeLabel?: string;
  variant?: 'default' | 'compact';
  step?: number;
  minPrice?: number;
  maxPrice?: number;
}

const Card = styled.View<{ variant: 'default' | 'compact' }>`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  padding: ${({ variant }) => variant === 'compact' 
    ? `${moderateScale(12)}px ${scale(16)}px` 
    : `${moderateScale(32)}px ${scale(24)}px`};
  align-items: center;
  shadow-color: rgb(23,29,25);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 24px;
  elevation: 2;
  gap: ${({ variant }) => variant === 'compact' ? verticalScale(8) : verticalScale(20)}px;
`;

const PriceLabel = styled.Text<{ variant: 'default' | 'compact' }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${({ variant }) => variant === 'compact' ? responsiveFont(10) : responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PriceRow = styled.View<{ variant: 'default' | 'compact' }>`
  flex-direction: row;
  align-items: center;
  gap: ${({ variant }) => variant === 'compact' ? scale(12) : scale(24)}px;
`;

const PriceText = styled.Text<{ variant: 'default' | 'compact' }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${({ variant }) => variant === 'compact' ? responsiveFont(28) : responsiveFont(52)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -1px;
  min-width: ${({ variant }) => variant === 'compact' ? scale(70) : scale(110)}px;
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

const DEFAULT_STEP = 50;
const DEFAULT_MIN = 50;
const DEFAULT_MAX = 2000;

export const PriceCounter: React.FC<PriceCounterProps> = ({
  price,
  onPriceChange,
  label,
  badgeLabel,
  variant = 'default',
  step = DEFAULT_STEP,
  minPrice = DEFAULT_MIN,
  maxPrice = DEFAULT_MAX,
}) => {
  const theme = useTheme();

  const handleDecrement = React.useCallback(() => 
    onPriceChange(Math.max(minPrice, price - step)), 
    [onPriceChange, minPrice, price, step]
  );

  const handleIncrement = React.useCallback(() => 
    onPriceChange(Math.min(maxPrice, price + step)), 
    [onPriceChange, maxPrice, price, step]
  );

  return (
    <Card variant={variant}>
      {label && <PriceLabel variant={variant}>{label}</PriceLabel>}
      <PriceRow variant={variant}>
        <CounterButton 
          type="remove" 
          onPress={handleDecrement} 
          disabled={price <= minPrice}
          size={variant === 'compact' ? 'small' : 'medium'}
        />
        <PriceText variant={variant}>₹{price}</PriceText>
        <CounterButton 
          type="add" 
          onPress={handleIncrement} 
          disabled={price >= maxPrice}
          size={variant === 'compact' ? 'small' : 'medium'}
        />
      </PriceRow>
      {!variant.includes('compact') && badgeLabel && (
        <RecommendedBadge>
          <MaterialIcons name="verified" size={moderateScale(16)} color={theme.colors.on_primary_fixed_variant} />
          <BadgeText>{badgeLabel}</BadgeText>
        </RecommendedBadge>
      )}
    </Card>
  );
};
