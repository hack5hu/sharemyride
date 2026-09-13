import { type ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const mapViewStyle: ViewStyle = { flex: 1 };

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const MapContainer = styled.View`
  flex: 1;
`;

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const HeaderCard = styled.View<{ topInset: number }>`
  position: absolute;
  top: ${({ topInset }) => topInset + verticalScale(6)}px;
  left: ${scale(14)}px;
  right: ${scale(14)}px;
  flex-direction: row;
  align-items: center;
  z-index: 20;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(7)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.16;
  shadow-radius: ${moderateScale(10)}px;
  elevation: 8;
`;

export const HeaderIconButton = styled.Pressable<{ hasActiveFilters?: boolean }>`
  width: ${scale(36)}px;
  height: ${scale(36)}px;
  border-radius: ${scale(18)}px;
  background-color: ${({ theme, hasActiveFilters }) =>
    hasActiveFilters
      ? theme.colors.primary_container
      : theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

export const RouteColumn = styled.View`
  flex: 1;
  margin-horizontal: ${scale(8)}px;
  justify-content: center;
`;

export const RouteItemRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RouteDot = styled.View<{ color: string }>`
  width: ${scale(7)}px;
  height: ${scale(7)}px;
  border-radius: ${scale(3.5)}px;
  background-color: ${({ color }) => color};
  margin-right: ${scale(6)}px;
`;

export const RouteItemDivider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.surface_variant};
  margin-vertical: ${verticalScale(3)}px;
  margin-left: ${scale(13)}px;
  opacity: 0.4;
`;

export const ActiveFilterDot = styled.View`
  position: absolute;
  top: ${scale(6)}px;
  right: ${scale(6)}px;
  width: ${scale(8)}px;
  height: ${scale(8)}px;
  border-radius: ${scale(4)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const ControlsWrapper = styled.View<{ bottomInset?: number }>`
  position: absolute;
  right: ${scale(16)}px;
  bottom: ${({ bottomInset }) =>
    (bottomInset ? bottomInset + verticalScale(175) : verticalScale(185))}px;
  z-index: 15;
`;

export const CenterMarkerContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -${scale(15)}px;
  margin-top: -${verticalScale(30)}px;
  align-items: center;
  justify-content: center;
`;

export const CenterMarkerPulse = styled.View`
  width: ${scale(10)}px;
  height: ${scale(10)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${scale(5)}px;
  opacity: 0.3;
  position: absolute;
  bottom: 0;
`;
