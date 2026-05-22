import styled from 'styled-components/native';
import { scale, verticalScale } from '@/styles';

export const Container = styled.View`
  width: 100%;
  gap: ${scale(8)}px;
`;

export const InputWrapper = styled.View<{
  isFocused: boolean;
  hasError: boolean;
  multiline?: boolean;
}>`
  width: 100%;
  min-height: ${({ multiline }) => (multiline ? verticalScale(120) : verticalScale(52))}px;
  background-color: ${({ theme, isFocused, hasError }) => {
    if (hasError) return theme.colors.error_container;
    if (isFocused) return theme.colors.surface_container_lowest;
    return theme.colors.surface_container;
  }};
  border-radius: ${({ theme }) => theme.roundness.md}px;
  flex-direction: row;
  align-items: ${({ multiline }) => (multiline ? 'flex-start' : 'center')};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${({ multiline }) => (multiline ? verticalScale(10) : 0)}px;
  
  /* Ambient shadow shift for active/focus states matching 'No-Line' rule */
  elevation: ${({ isFocused }) => (isFocused ? 2 : 0)};
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: ${({ isFocused }) => (isFocused ? '0px 2px' : '0px 0px')};
  shadow-opacity: ${({ isFocused }) => (isFocused ? 0.05 : 0)};
  shadow-radius: ${({ isFocused }) => (isFocused ? '8px' : '0px')};
`;

export const InnerInput = styled.TextInput<{ multiline?: boolean }>`
  flex: 1;
  height: 100%;
  padding-horizontal: ${scale(8)}px;
  font-family: 'Plus Jakarta Sans';
  font-size: ${scale(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  text-align-vertical: ${({ multiline }) => (multiline ? 'top' : 'center')};
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
`;

export const RequiredAsterisk = styled.Text`
  color: ${({ theme }) => theme.colors.error};
`;

export const PrefixContainer = styled(IconContainer)`
  padding-right: 0px;
`;

export const PrefixText = styled(LabelText)`
  margin-bottom: 0px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const ErrorText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${scale(11)}px;
  color: ${({ theme }) => theme.colors.error};
  padding-left: ${scale(4)}px;
`;
