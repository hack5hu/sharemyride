import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const ChipContainer = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(10)}px;
  border-radius: ${moderateScale(24)}px;
  border-width: 1px;
  border-color: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.primary : theme.colors.outline_variant};
  background-color: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.primary_container : theme.colors.surface_container_low};
  align-items: center;
  justify-content: center;
`;

export const ChipText = styled.Text<{ isSelected: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(12)}px;
  font-weight: ${({ isSelected }) => (isSelected ? '700' : '500')};
  color: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.on_primary : theme.colors.on_surface_variant};
`;
