import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${verticalScale(8)}px ${scale(12)}px;
  gap: ${scale(10)}px;
  background-color: ${({ theme, isSelected }) =>
    isSelected
      ? `${theme.colors.primary}12`
      : theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
  border-width: 1.5px;
  border-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : 'transparent'};
`;

export const IconBox = styled.View<{ isSelected: boolean }>`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(8)}px;
  background-color: ${({ theme, isSelected }) =>
    isSelected
      ? `${theme.colors.primary}25`
      : theme.colors.surface_container_highest};
  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text<{ isSelected?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(13.5)}px;
  font-weight: ${({ isSelected }) => (isSelected ? '700' : '600')};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : theme.colors.on_surface};
  flex: 1;
`;

export const RadioCircle = styled.View<{ isSelected: boolean }>`
  width: ${moderateScale(18)}px;
  height: ${moderateScale(18)}px;
  border-radius: ${moderateScale(9)}px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : 'transparent'};
  border-width: ${({ isSelected }) => (isSelected ? '0px' : '1.5px')};
  border-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : theme.colors.outline_variant};
  align-items: center;
  justify-content: center;
`;
