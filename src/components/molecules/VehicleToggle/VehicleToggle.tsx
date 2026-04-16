import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

const ToggleContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(6)}px;
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
`;

const ToggleButton = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  padding-vertical: ${verticalScale(10)}px;
  border-radius: ${moderateScale(8)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.surface_container_lowest : 'transparent'};
  shadow-color: ${({ isActive }) => (isActive ? 'rgb(0,0,0)' : 'transparent')};
  shadow-offset: 0px 1px;
  shadow-opacity: ${({ isActive }) => (isActive ? 0.08 : 0)};
  shadow-radius: 4px;
  elevation: ${({ isActive }) => (isActive ? 2 : 0)};
`;

const ToggleText = styled.Text<{ isActive: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: ${({ isActive }) => (isActive ? '700' : '500')};
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.on_surface_variant};
`;

export type VehicleType = '5' | '7';

export interface VehicleToggleProps {
  selected: VehicleType;
  onSelect: (type: VehicleType) => void;
  fiveSeaterLabel: string;
  sevenSeaterLabel: string;
}

export const VehicleToggle: React.FC<VehicleToggleProps> = ({
  selected,
  onSelect,
  fiveSeaterLabel,
  sevenSeaterLabel,
}) => (
  <ToggleContainer>
    <ToggleButton isActive={selected === '5'} onPress={() => onSelect('5')} activeOpacity={0.8}>
      <ToggleText isActive={selected === '5'}>{fiveSeaterLabel}</ToggleText>
    </ToggleButton>
    <ToggleButton isActive={selected === '7'} onPress={() => onSelect('7')} activeOpacity={0.8}>
      <ToggleText isActive={selected === '7'}>{sevenSeaterLabel}</ToggleText>
    </ToggleButton>
  </ToggleContainer>
);
