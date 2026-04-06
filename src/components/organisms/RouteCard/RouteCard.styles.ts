import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const CardContainer = styled.TouchableOpacity<{ $isActive: boolean }>`
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(16)}px;
  background-color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.surface_container_lowest : theme.colors.surface_container_low};
  padding: ${moderateScale(20)}px;
  border-radius: ${moderateScale(12)}px;
  border-width: ${({ $isActive }) => ($isActive ? 2 : 1)}px;
  border-color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary : `${theme.colors.outline_variant}1A`};
  /* Mock hover/transition with opacity elsewhere or just visually static for native */
  margin-bottom: ${verticalScale(12)}px;
  
  ${({ $isActive, theme }) => $isActive && `
    shadow-color: ${theme.colors.primary};
    shadow-offset: 0px 4px;
    shadow-opacity: 0.08;
    shadow-radius: 20px;
    elevation: 4;
  `}
`;

export const IconContainer = styled.View<{ $isActive: boolean }>`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: 9999px;
  background-color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary_fixed : theme.colors.secondary_container};
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.View`
  flex: 1;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${verticalScale(4)}px;
`;

export const RouteTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const BadgeContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: 9999px;
`;

export const BadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  text-transform: uppercase;
`;

export const MetricsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const MetricItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const MetricText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const DescriptionText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_secondary_container};
`;
