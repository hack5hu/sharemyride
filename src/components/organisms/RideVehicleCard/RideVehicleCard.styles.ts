import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const VehicleCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(18)}px ${moderateScale(20)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 16px;
  elevation: 3;
`;

export const VehicleLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const SectionDot = styled.View<{ color?: string }>`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ theme, color }) => color || theme.colors.primary};
  margin-right: ${scale(8)}px;
`;

export const MainRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(14)}px;
`;

export const VehicleIconBox = styled.View`
  width: ${moderateScale(52)}px;
  height: ${moderateScale(52)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
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
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(3)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const ColorPill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(3)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const ColorDot = styled.View<{ colorHex: string }>`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ colorHex }) => colorHex};
`;
