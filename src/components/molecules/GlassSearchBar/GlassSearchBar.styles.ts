import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

// Single clean pill — no double container noise
export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(14)}px;
  padding-horizontal: ${scale(14)}px;
  height: ${verticalScale(48)}px;
  gap: ${scale(10)}px;
  shadow-color: ${({ theme }) => theme.colors.on_background};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 4;
`;

export const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.on_surface_variant + '70',
}))`
  flex: 1;
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface};
  padding: 0;
`;

export const LocationButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  width: ${moderateScale(34)}px;
  height: ${moderateScale(34)}px;
  border-radius: ${moderateScale(10)}px;
  align-items: center;
  justify-content: center;
`;
