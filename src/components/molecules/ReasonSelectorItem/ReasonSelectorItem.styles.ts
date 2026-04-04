import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.TouchableOpacity<{ isSelected: boolean }>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.primary_container : theme.colors.surface_container_low};
  margin-bottom: ${verticalScale(12)}px;
`;

export const Label = styled.Text<{ isSelected: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(15)}px;
  font-weight: ${({ isSelected }) => isSelected ? '600' : '500'};
  color: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.on_primary_container : theme.colors.on_surface};
  flex: 1;
  text-align: left;
`;

export const UncheckedCircle = styled.View`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: 9999px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
  opacity: 0.5;
`;
