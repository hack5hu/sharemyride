import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(24)}px;
`;

export const SearchSummaryCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(24)}px;
  margin-bottom: ${verticalScale(24)}px;
  box-shadow: 0px 4px 24px rgba(23, 29, 25, 0.04);
  elevation: 2;
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
`;

export const LocationVertical = styled.View`
  align-items: center;
`;

export const Line = styled.View`
  width: ${moderateScale(1)}px;
  height: ${verticalScale(24)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant}4D;
  margin-vertical: ${verticalScale(4)}px;
`;

export const FilterButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding: ${moderateScale(12)}px;
  border-radius: ${moderateScale(16)}px;
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
