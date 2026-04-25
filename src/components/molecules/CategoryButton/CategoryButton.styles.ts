import styled from 'styled-components/native';
import { scale, moderateScale } from '@/styles';

export const Container = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(16)}px;
  gap: ${scale(16)}px;
  background-color: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.surface_container_highest : theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
  border-width: 2px;
  border-color: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.primary : 'transparent'};
`;

export const Label = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.on_surface};
  flex: 1;
`;
