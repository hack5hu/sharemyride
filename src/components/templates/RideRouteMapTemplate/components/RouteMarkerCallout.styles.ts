import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const MarkerContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const CalloutBubble = styled.View<{ $role: string }>`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(10)}px;
  padding: ${verticalScale(6)}px ${scale(10)}px;
  max-width: ${scale(220)}px;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme, $role }) => {
    if ($role === 'start' || $role === 'user-pickup') return '#00875a';
    if ($role === 'end' || $role === 'user-dropoff') return theme.colors.error;

    return theme.colors.primary;
  }};
  shadow-color: ${({ theme }) => theme.colors.on_surface};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 6;
`;

export const CalloutRoleBadge = styled.View<{ $role: string }>`
  background-color: ${({ theme, $role }) => {
    if ($role === 'start' || $role === 'user-pickup') return '#00875a18';
    if ($role === 'end' || $role === 'user-dropoff') return `${theme.colors.error}18`;

    return `${theme.colors.primary}18`;
  }};
  border-radius: ${moderateScale(6)}px;
  padding: ${verticalScale(2)}px ${scale(6)}px;
  margin-bottom: ${verticalScale(3)}px;
`;

export const CalloutRoleText = styled.Text<{ $role: string }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(9)}px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({ theme, $role }) => {
    if ($role === 'start' || $role === 'user-pickup') return '#00875a';
    if ($role === 'end' || $role === 'user-dropoff') return theme.colors.error;

    return theme.colors.primary;
  }};
`;

export const CalloutAddressText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.on_surface};
  text-align: center;
  line-height: ${responsiveFont(15)}px;
`;

export const CalloutPointer = styled.View<{ $role: string }>`
  width: 0px;
  height: 0px;
  border-left-width: ${scale(6)}px;
  border-right-width: ${scale(6)}px;
  border-top-width: ${verticalScale(6)}px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: ${({ theme, $role }) => {
    if ($role === 'start' || $role === 'user-pickup') return '#00875a';
    if ($role === 'end' || $role === 'user-dropoff') return theme.colors.error;

    return theme.colors.primary;
  }};
  margin-bottom: ${verticalScale(2)}px;
`;

export const MarkerDot = styled.View<{ $role: string }>`
  width: ${moderateScale(16)}px;
  height: ${moderateScale(16)}px;
  border-radius: ${moderateScale(8)}px;
  background-color: ${({ theme, $role }) => {
    if ($role === 'start' || $role === 'user-pickup') return '#00875a';
    if ($role === 'end' || $role === 'user-dropoff') return theme.colors.error;

    return theme.colors.primary;
  }};
  border-width: 2.5px;
  border-color: #ffffff;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 4;
`;
