import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const VehicleCard = styled.View`
  background-color: ${({ theme }) => theme.colors.on_primary};
  border-radius: ${({ theme }) => theme.roundness.md}px;
  padding: ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(16)}px;
  elevation: 1;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.06;
  shadow-radius: 6px;
`;

export const VehicleLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(14)}px;
`;

export const SectionDot = styled.View<{ color?: string }>`
  width: ${moderateScale(6)}px;
  height: ${moderateScale(6)}px;
  border-radius: ${moderateScale(3)}px;
  background-color: ${({ theme, color }) => color || theme.colors.primary};
  margin-right: ${scale(8)}px;
`;

export const MainRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const VehicleIconBox = styled.View`
  width: ${moderateScale(60)}px;
  height: ${moderateScale(60)}px;
  border-radius: ${({ theme }) => theme.roundness.md}px;
  background-color: ${({ theme }) => theme.colors.surface_container};
  align-items: center;
  justify-content: center;
`;

export const VehicleDetails = styled.View`
  flex: 1;
  gap: ${verticalScale(6)}px;
`;

export const PlateRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  flex-wrap: wrap;
`;

export const PlateBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(3)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const CategoryPill = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(3)}px;
  border-radius: ${moderateScale(20)}px;
`;
