import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

const LegendRow = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${scale(20)}px;
  margin-top: ${verticalScale(24)}px;
`;

const LegendItem = styled.View<{ dimmed?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  opacity: ${({ dimmed }) => (dimmed ? 0.4 : 1)};
`;

const LegendDot = styled.View<{ variant: 'selected' | 'available' | 'occupied' }>`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  border-radius: ${moderateScale(3)}px;
  background-color: ${({ theme, variant }) => {
    if (variant === 'selected') return theme.colors.primary;
    if (variant === 'available') return theme.colors.surface_container_lowest;
    return theme.colors.surface_container;
  }};
  border-width: ${({ variant }) => (variant === 'selected' ? 0 : 1)}px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
`;

const LegendLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
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
  <LegendRow>
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
  </LegendRow>
);
