import styled from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
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
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px ${moderateScale(18)}px;
  margin-bottom: ${verticalScale(16)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 16px;
  elevation: 3;
`;

export const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(14)}px;
`;

export const RouteSection = styled.View`
  flex: 1;
  margin-right: ${scale(12)}px;
`;

export const RouteRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TrackColumn = styled.View`
  align-items: center;
  justify-content: center;
  width: ${scale(18)}px;
`;

export const OriginDot = styled.View`
  width: ${moderateScale(9)}px;
  height: ${moderateScale(9)}px;
  border-radius: ${moderateScale(5)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const TrackLine = styled.View`
  width: 2px;
  height: ${verticalScale(14)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant + '44'};
  margin-vertical: ${verticalScale(1)}px;
`;

export const DestinationDot = styled.View`
  width: ${moderateScale(9)}px;
  height: ${moderateScale(9)}px;
  border-radius: ${moderateScale(2)}px;
  background-color: ${({ theme }) =>
    theme.colors.tertiary || theme.colors.on_surface_variant};
`;

export const LocationTextWrapper = styled.View`
  flex: 1;
  padding-left: ${scale(8)}px;
`;

export const FilterButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  width: ${moderateScale(42)}px;
  height: ${moderateScale(42)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
`;

export const SummaryFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${verticalScale(12)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.outline_variant + '20'};
`;

export const FooterItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high + '66'};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(5)}px;
  border-radius: ${moderateScale(8)}px;
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

export const RouteTextContainer = styled.View`
  flex: 1;
  gap: ${verticalScale(8)}px;
`;

export const ListWrapper = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  padding-vertical: ${verticalScale(60)}px;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled(Typography)`
  margin-top: ${verticalScale(16)}px;
`;

export const FetchMoreLoadingContainer = styled.View`
  padding-vertical: ${verticalScale(20)}px;
`;

export const FooterSpacer = styled.View`
  height: ${verticalScale(32)}px;
`;
