import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
  padding-horizontal: ${scale(24)}px;
`;

export const SearchSummaryCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(28)}px;
  padding: ${moderateScale(24)}px;
  margin-bottom: ${verticalScale(24)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 20px;
  elevation: 4;
  position: relative;
`;

export const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const RouteInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  padding-right: ${scale(48)}px;
  flex: 1;
`;

export const LocationVertical = styled.View`
  align-items: center;
`;

export const Line = styled.View`
  width: ${moderateScale(1.5)}px;
  height: ${verticalScale(32)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant}33;
  margin-vertical: ${verticalScale(2)}px;
`;

export const FilterButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding: ${moderateScale(10)}px;
  border-radius: ${moderateScale(14)}px;
  position: absolute;
  top: ${moderateScale(12)}px;
  right: ${moderateScale(-12)}px;
`;

export const SummaryFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${verticalScale(16)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.outline_variant}1A;
`;

export const FooterItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const FilterScrollView = styled.ScrollView`
  margin-bottom: ${verticalScale(24)}px;
`;

export const FilterChip = styled.TouchableOpacity<{ active?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(999)}px;
  background-color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.surface_container_high};
  margin-right: ${scale(12)}px;
`;
