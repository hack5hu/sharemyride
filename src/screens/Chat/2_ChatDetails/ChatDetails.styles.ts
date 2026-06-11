import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const ConnectionBanner = styled.TouchableOpacity<{ isConnecting: boolean }>`
  width: 100%;
  padding-vertical: ${verticalScale(8)}px;
  padding-horizontal: ${scale(16)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isConnecting }) =>
    isConnecting ? theme.colors.secondary_container : theme.colors.error_container};
`;

export const DateHeaderContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-vertical: ${verticalScale(12)}px;
`;

export const DateHeaderPill = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding-vertical: ${verticalScale(4)}px;
  padding-horizontal: ${scale(12)}px;
  border-radius: ${moderateScale(12)}px;
`;
