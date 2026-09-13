import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  border-width: 1px;
  border-color: ${({ theme }) =>
    theme.colors.outline_variant || 'rgba(0, 0, 0, 0.08)'};
  padding: ${moderateScale(20)}px;
  shadow-color: rgb(0, 0, 0);
  shadow-offset: 0px 6px;
  shadow-opacity: 0.06;
  shadow-radius: 20px;
  elevation: 3;
  position: relative;
`;

export const VisualPathLine = styled.View`
  position: absolute;
  left: ${moderateScale(31)}px;
  top: ${moderateScale(38)}px;
  bottom: ${moderateScale(38)}px;
  width: ${scale(2)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}33`};
  border-radius: 9999px;
`;

export const InputsWrapper = styled.View`
  gap: ${verticalScale(16)}px;
  position: relative;
`;

export const InputGroup = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${scale(14)}px;
`;

export const StartIconContainer = styled.View`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 2;
`;

export const DestinationIconContainer = styled.View`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.error || '#d9383a'};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.error || '#d9383a'};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 2;
`;

export const InputContent = styled.View`
  flex: 1;
  padding-right: ${scale(36)}px;
`;

export const InputLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(9.5)}px;
  color: ${({ theme }) => theme.colors.outline};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: ${verticalScale(4)}px;
`;

export const MockInput = styled.View<{ $hasValue?: boolean }>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme, $hasValue }) =>
    $hasValue ? `${theme.colors.primary}30` : 'transparent'};
  padding: ${moderateScale(12)}px ${moderateScale(14)}px;
`;

export const MockInputText = styled.Text<{ $hasValue?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: ${({ $hasValue }) => ($hasValue ? '600' : '400')};
  font-size: ${responsiveFont(13)}px;
  line-height: ${responsiveFont(18)}px;
  color: ${({ theme, $hasValue }) =>
    $hasValue ? theme.colors.on_surface : theme.colors.outline};
`;

export const SwapButton = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  top: 50%;
  margin-top: -${moderateScale(18)}px;
  width: ${moderateScale(36)}px;
  height: ${moderateScale(36)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
  border-width: 1px;
  border-color: ${({ theme }) =>
    theme.colors.outline_variant || 'rgba(0,0,0,0.08)'};
  align-items: center;
  justify-content: center;
  shadow-color: rgb(0, 0, 0);
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  elevation: 3;
  z-index: 20;
`;
