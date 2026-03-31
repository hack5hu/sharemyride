import styled from 'styled-components/native';
import { scale, verticalScale } from '@/styles';

export const Container = styled.View`
  width: 100%;
  gap: ${scale(8)}px;
`;

export const InputWrapper = styled.View<{
  isFocused: boolean;
  hasError: boolean;
}>`
  width: 100%;
  height: ${verticalScale(52)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${({ theme }) => theme.roundness.md}px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme, isFocused, hasError }) => {
    if (hasError) return theme.colors.error;
    if (isFocused) return theme.colors.primary;
    return theme.colors.outline;
  }};
  padding-horizontal: ${scale(8)}px;
`;

export const InnerInput = styled.TextInput`
  flex: 1;
  height: 100%;
  padding-horizontal: ${scale(8)}px;
  font-family: 'Plus Jakarta Sans';
  font-size: ${scale(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const IconContainer = styled.View`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${scale(4)}px;
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
