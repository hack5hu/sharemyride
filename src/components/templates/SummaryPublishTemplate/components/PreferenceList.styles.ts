import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const GlassCard = styled.View<{ hasError?: boolean }>`
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}99`};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(20)}px;
  border-width: 1px;
  border-color: ${({ theme, hasError }) => hasError ? theme.colors.error : `${theme.colors.on_surface}1A`};
  margin-bottom: ${verticalScale(16)}px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const SectionLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const EditButton = styled.TouchableOpacity`
  padding: ${moderateScale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: 9999px;
`;

export const BadgeRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${scale(8)}px;
`;

export const PrefBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: 9999px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.on_surface}10`};
`;

export const PrefBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const EmptyStateWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
`;

export const EmptyStateText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;
