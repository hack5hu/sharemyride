import styled from 'styled-components/native';
import { moderateScale, verticalScale, scale } from '@/styles';

export const MapContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
  border-radius: ${moderateScale(16)}px;
  position: relative;
`;

export const StyledOverlayCard = styled.View`
  position: absolute;
  top: ${verticalScale(16)}px;
  left: ${scale(16)}px;
  right: ${scale(16)}px;
  padding: ${moderateScale(14)}px;
  background-color: ${({ theme }) =>
    theme.colors.surface_container_highest + 'EE'};
  border-radius: ${moderateScale(16)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 6;
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(12)}px;
`;

export const IndicatorDot = styled.View<{ active?: boolean }>`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.outline};
`;

export const OverlayTextContainer = styled.View`
  flex: 1;
`;
