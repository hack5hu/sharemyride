import styled from 'styled-components/native';
import { scale, verticalScale, responsiveFont } from '../../../styles';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap:5px;
  align-self: center;
`;

export const DigitInput = styled.TextInput<{ hasError?: boolean; isFocused?: boolean }>`
  width: ${scale(40)}px;
  height: ${verticalScale(56)}px;
  padding: 0;
  text-align: center;
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(24)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  background-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.surface_container_lowest : theme.colors.surface_container_highest};
  border-width: 2px;
  border-color: ${({ theme, isFocused, hasError }) =>
    hasError
      ? theme.colors.error
      : isFocused
      ? theme.colors.primary
      : 'transparent'};
  border-radius: ${({ theme }) => theme.roundness.md}px;
`;
