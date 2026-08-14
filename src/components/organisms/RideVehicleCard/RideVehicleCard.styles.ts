import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const VehicleCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(20)}px;
  margin-bottom: ${verticalScale(16)}px;
  elevation: 2;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 12px;
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
  gap: ${scale(18)}px;
`;

export const VehicleIconBox = styled.View`
  width: ${moderateScale(64)}px;
  height: ${moderateScale(64)}px;
  border-radius: ${moderateScale(18)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}10`};
  align-items: center;
  justify-content: center;
`;

export const VehicleDetails = styled.View`
  flex: 1;
  gap: ${verticalScale(8)}px;
`;

export const PlateRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  flex-wrap: wrap;
`;

export const PlateBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(8)}px;
`;

export const CategoryPill = styled.View`
  background-color: ${({ theme }) => `${theme.colors.secondary}12`};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const ColorPill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const ColorDot = styled.View<{ colorHex: string }>`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ colorHex }) => colorHex};
`;
