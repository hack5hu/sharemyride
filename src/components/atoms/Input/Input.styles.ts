import styled from 'styled-components/native';
import { scale, verticalScale } from '@/styles';

export const Container = styled.View`
  width: 100%;
  gap: ${scale(8)}px;
`;

export const StyledInput = styled.TextInput<{
  isFocused: boolean;
  hasError: boolean;
}>`
  width: 100%;
  height: ${verticalScale(52)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${({ theme }) => theme.roundness.md}px;
  padding-horizontal: ${scale(16)}px;
  font-family: 'Plus Jakarta Sans';
  font-size: ${scale(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  border-width: 1px;
  border-color: ${({ theme, isFocused, hasError }) => {
    if (hasError) return theme.colors.error;
    if (isFocused) return theme.colors.primary;
    return theme.colors.outline;
  }};

  /* Focus glow effect */
  shadow-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.primary : 'transparent'};
  shadow-offset: 0px 0px;
  shadow-opacity: ${({ isFocused }) => (isFocused ? 0.1 : 0)};
  shadow-radius: 4px;
  elevation: ${({ isFocused }) => (isFocused ? 2 : 0)};
`;

export const LabelText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${scale(12)}px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  padding-left: ${scale(4)}px;
`;

export const ErrorText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${scale(11)}px;
  color: ${({ theme }) => theme.colors.error};
  padding-left: ${scale(4)}px;
`;
