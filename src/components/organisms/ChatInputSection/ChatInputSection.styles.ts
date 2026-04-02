import styled from 'styled-components/native';
import { verticalScale, moderateScale, scale } from '@/styles';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  shadow-color: #000;
  shadow-offset: 0px -8px;
  shadow-opacity: 0.04;
  shadow-radius: 30px;
  elevation: 10;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${scale(16)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(32)}px;
  gap: ${scale(12)}px;
`;

export const LocationButton = styled.TouchableOpacity`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  justify-content: center;
  align-items: center;
`;

export const InputFieldContainer = styled.View`
  flex: 1;
  position: relative;
`;

export const StyledInput = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(12)}px;
  padding-horizontal: ${scale(20)}px;
  padding-vertical: ${verticalScale(12)}px;
  padding-right: ${scale(52)}px;
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const SendButton = styled.TouchableOpacity`
  position: absolute;
  right: ${scale(8)}px;
  top: ${verticalScale(6)}px;
  width: ${moderateScale(36)}px;
  height: ${moderateScale(36)}px;
  border-radius: ${moderateScale(8)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;
