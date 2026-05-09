import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const StatsStrip = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${verticalScale(12)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const StatPill = styled.View`
  flex: 1;
  align-items: center;
  padding: ${moderateScale(10)}px ${moderateScale(4)}px;
  background-color: ${({ theme }) => theme.colors.surface_container};
  border-radius: ${({ theme }) => theme.roundness.md}px;
  margin-horizontal: ${scale(4)}px;
`;

export const StatPillIcon = styled.View`
  width: ${moderateScale(28)}px;
  height: ${moderateScale(28)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme }) => theme.colors.primary_container};
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(6)}px;
`;

export const Root = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
