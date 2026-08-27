import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const VehicleCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest || theme.colors.surface};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(20)}px;
  gap: ${verticalScale(12)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 10px;
  elevation: 2;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant || '#e2e2e2'}30`};
`;

export const VehicleTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const VehicleIconContainer = styled.View`
  width: ${moderateScale(42)}px;
  height: ${moderateScale(42)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  align-items: center;
  justify-content: center;
`;

export const VehicleInfoGroup = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const VehicleTitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const VehicleModelLight = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const VehicleBadgesRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${scale(6)}px;
`;

export const VehicleBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container || '#f0f4f9'};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(3)}px;
  border-radius: ${moderateScale(6)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const ColorDot = styled.View`
  width: ${moderateScale(6)}px;
  height: ${moderateScale(6)}px;
  border-radius: ${moderateScale(3)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const VehicleBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  letter-spacing: 0.2px;
`;
