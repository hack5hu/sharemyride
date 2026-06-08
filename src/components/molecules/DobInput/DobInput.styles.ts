import styled from 'styled-components/native';
import { scale, verticalScale } from '@/styles';

export const Container = styled.View`
  width: 100%;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(12)}px;
  width: 100%;
`;

export const DayContainer = styled.View`
  flex: 1;
`;

export const MonthContainer = styled.View`
  flex: 1.5;
`;

export const YearContainer = styled.View`
  flex: 1.2;
`;

export const MonthSelectorButton = styled.TouchableOpacity<{
  isFocused: boolean;
  hasError: boolean;
}>`
  width: 100%;
  height: ${verticalScale(52)}px;
  background-color: ${({ theme, isFocused, hasError }) => {
    if (hasError) return theme.colors.error_container;
    if (isFocused) return theme.colors.surface_container_lowest;
    return theme.colors.surface_container;
  }};
  border-radius: ${({ theme }) => theme.roundness.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(12)}px;

  elevation: ${({ isFocused }) => (isFocused ? 2 : 0)};
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: ${({ isFocused }) => (isFocused ? '0px 2px' : '0px 0px')};
  shadow-opacity: ${({ isFocused }) => (isFocused ? 0.05 : 0)};
  shadow-radius: ${({ isFocused }) => (isFocused ? '8px' : '0px')};
`;

export const LabelText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${scale(12)}px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-bottom: ${scale(8)}px;
`;

export const RequiredAsterisk = styled.Text`
  color: ${({ theme }) => theme.colors.error};
`;

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.roundness.lg}px;
  max-height: 70%;
  width: 80%;
  padding: ${scale(16)}px;
`;

export const MonthItem = styled.TouchableOpacity`
  padding-vertical: ${verticalScale(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.surface_container_highest};
`;
