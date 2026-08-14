import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import { Typography } from '@/components/atoms/Typography';

export const LogItemStyle = styled.TouchableOpacity<{ isError: boolean }>`
  padding: ${moderateScale(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.surface_variant};
  background-color: ${({ theme, isError }) =>
    isError ? theme.colors.error_container : theme.colors.surface};
`;

export const LogHeaderStyle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(8)}px;
`;

export const MethodBadgeStyle = styled.View<{ method: string }>`
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ theme, method }) => {
    switch (method) {
      case 'GET':
        return theme.colors.primary_container;
      case 'POST':
        return '#e8f5e9'; // success tint
      case 'PUT':
      case 'PATCH':
        return '#fff3e0'; // warning tint
      case 'DELETE':
        return theme.colors.error_container;
      default:
        return theme.colors.surface_variant;
    }
  }};
`;

export const MethodTextStyle = styled(Typography as any)<{ method: string }>`
  color: ${({ theme, method }) => {
    switch (method) {
      case 'GET':
        return theme.colors.on_primary_container;
      case 'POST':
        return '#2e7d32';
      case 'PUT':
      case 'PATCH':
        return '#e65100';
      case 'DELETE':
        return theme.colors.on_error_container;
      default:
        return theme.colors.on_surface_variant;
    }
  }};
  font-weight: bold;
`;

export const StatusBadgeStyle = styled.View<{ status: number | null }>`
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ theme, status }) => {
    if (!status) return theme.colors.surface_variant;
    if (status >= 200 && status < 300) return '#e8f5e9';
    if (status >= 400) return theme.colors.error_container;
    return theme.colors.surface_variant;
  }};
`;

export const StatusTextStyle = styled(Typography as any)<{ status: number | null }>`
  color: ${({ theme, status }) => {
    if (!status) return theme.colors.on_surface_variant;
    if (status >= 200 && status < 300) return '#2e7d32';
    if (status >= 400) return theme.colors.on_error_container;
    return theme.colors.on_surface_variant;
  }};
  font-weight: bold;
`;

export const UrlTextStyle = styled(Typography as any)`
  margin-bottom: ${verticalScale(8)}px;
`;

export const MetaRowStyle = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const EmptyStateStyle = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${moderateScale(24)}px;
`;

export const LogCodeBlockStyle = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container};
  padding: ${moderateScale(12)}px;
  border-radius: ${moderateScale(8)}px;
`;

export const LogCodeTextStyle = styled.Text`
  font-family: 'Courier';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;
