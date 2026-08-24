import React from 'react';
import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

const LegendContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${verticalScale(10)}px ${scale(20)}px;
  border-radius: ${moderateScale(24)}px;
  align-self: center;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
  margin-top: ${verticalScale(4)}px;
  margin-bottom: ${verticalScale(12)}px;
`;

const LegendItem = styled.View<{ dimmed?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  opacity: ${({ dimmed }) => (dimmed ? 0.7 : 1)};
`;

const LegendDot = styled.View<{
  variant: 'selected' | 'available' | 'occupied';
}>`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  border-radius: ${moderateScale(6)}px;
  background-color: ${({ theme, variant }) => {
    if (variant === 'selected') return theme.colors.primary;
    if (variant === 'available') return `${theme.colors.primary}18`;
    return theme.colors.outline_variant;
  }};
  border-width: ${({ variant }) => (variant === 'available' ? '1.5px' : '0px')};
  border-color: ${({ theme, variant }) =>
    variant === 'available' ? theme.colors.primary : 'transparent'};
`;

const LegendLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export interface SeatLegendProps {
  selectedLabel: string;
  availableLabel: string;
  occupiedLabel: string;
}

export const SeatLegend: React.FC<SeatLegendProps> = ({
  selectedLabel,
  availableLabel,
  occupiedLabel,
}) => (
  <LegendContainer>
    <LegendItem>
      <LegendDot variant="selected" />
      <LegendLabel>{selectedLabel}</LegendLabel>
    </LegendItem>
    <LegendItem>
      <LegendDot variant="available" />
      <LegendLabel>{availableLabel}</LegendLabel>
    </LegendItem>
    <LegendItem dimmed>
      <LegendDot variant="occupied" />
      <LegendLabel>{occupiedLabel}</LegendLabel>
    </LegendItem>
  </LegendContainer>
);
