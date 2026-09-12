import styled from 'styled-components/native';
import { moderateScale, responsiveFont, scale, verticalScale } from '@/styles';

export const TabsContainer = styled.View`
  flex-direction: row;
  padding: ${moderateScale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => `${theme.colors.outline_variant}35`};
  gap: ${scale(8)}px;
`;

export const TabButton = styled.TouchableOpacity<{ $isActive: boolean }>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(9)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.surface : 'transparent'};
  border-width: 1.5px;
  border-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : 'transparent'};
  shadow-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : 'transparent'};
  shadow-offset: 0px 2px;
  shadow-opacity: ${({ $isActive }) => ($isActive ? 0.08 : 0)};
  shadow-radius: 4px;
  elevation: ${({ $isActive }) => ($isActive ? 2 : 0)};
`;

export const IconContainer = styled.View<{ $isActive: boolean }>`
  width: ${moderateScale(34)}px;
  height: ${moderateScale(34)}px;
  border-radius: ${moderateScale(17)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? `${theme.colors.primary}15` : theme.colors.surface_container_high};
  margin-right: ${scale(8)}px;
`;

export const TextColumn = styled.View`
  flex: 1;
  justify-content: center;
`;

export const TabTitle = styled.Text<{ $isActive: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  font-weight: ${({ $isActive }) => ($isActive ? '700' : '600')};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.on_surface};
  line-height: ${verticalScale(16)}px;
`;

export const TabSubtitle = styled.Text<{ $isActive: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(10)}px;
  font-weight: 500;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
  line-height: ${verticalScale(13)}px;
`;
