import styled from 'styled-components/native';
import { moderateScale, responsiveFont, scale, verticalScale } from '@/styles';
import { type TransactionFilter } from './types.d';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(12)}px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(18)}px;
  color: ${props => props.theme.colors.on_surface};
  font-weight: 700;
`;

export const BackButton = styled.Pressable`
  padding: ${moderateScale(4)}px;
`;

export const SummaryCard = styled.View`
  background-color: ${props =>
    props.theme.name === 'dark' ? 'rgba(245, 158, 11, 0.12)' : '#FEF3C7'};
  border-radius: ${moderateScale(16)}px;
  margin-horizontal: ${scale(16)}px;
  margin-bottom: ${verticalScale(14)}px;
  padding: ${scale(16)}px;
  border-width: 1px;
  border-color: ${props =>
    props.theme.name === 'dark' ? 'rgba(251, 191, 36, 0.3)' : '#FCD34D'};
`;

export const BalanceRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(12)}px;
`;

export const BalanceLabel = styled.Text`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${responsiveFont(14)}px;
  color: ${props =>
    props.theme.name === 'dark' ? '#FBBF24' : '#B45309'};
`;

export const StatsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${verticalScale(10)}px;
  border-top-width: 1px;
  border-top-color: ${props =>
    props.theme.name === 'dark' ? 'rgba(251, 191, 36, 0.2)' : '#FDE68A'};
`;

export const StatBox = styled.View`
  flex: 1;
`;

export const StatTitle = styled.Text`
  font-family: 'PlusJakartaSans-Medium';
  font-size: ${responsiveFont(11)}px;
  color: ${props => props.theme.colors.on_surface_variant};
  margin-bottom: ${verticalScale(2)}px;
`;

export const StatAmount = styled.Text<{ isEarned?: boolean }>`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(15)}px;
  color: ${props =>
    props.isEarned
      ? props.theme.name === 'dark'
        ? '#34D399'
        : '#15803D'
      : props.theme.name === 'dark'
      ? '#F87171'
      : '#B91C1C'};
  font-weight: 700;
`;

export const FilterBar = styled.View`
  flex-direction: row;
  margin-horizontal: ${scale(16)}px;
  margin-bottom: ${verticalScale(12)}px;
  gap: ${scale(8)}px;
`;

export const FilterChip = styled.Pressable<{ active: boolean }>`
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.surface};
  border-width: 1px;
  border-color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.outline_variant};
`;

export const FilterText = styled.Text<{ active: boolean }>`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${responsiveFont(12)}px;
  color: ${props =>
    props.active ? props.theme.colors.on_primary : props.theme.colors.on_surface};
`;

export const ScrollList = styled.ScrollView`
  flex: 1;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(60)}px;
  padding-horizontal: ${scale(24)}px;
`;

