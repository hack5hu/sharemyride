import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(8)}px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: ${moderateScale(16)}px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.4);
  shadow-color: ${({ theme }) => theme.colors.on_background};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.1;
  shadow-radius: 16px;
  elevation: 6;
  gap: ${scale(8)}px;
`;

export const InputWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${scale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
  height: ${verticalScale(44)}px;
  gap: ${scale(8)}px;
`;

export const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.on_surface_variant + '80',
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
  width: ${moderateScale(44)}px;
  height: ${moderateScale(44)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
`;
