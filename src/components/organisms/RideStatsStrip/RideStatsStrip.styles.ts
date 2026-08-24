import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const StatsStrip = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${verticalScale(4)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const StatPill = styled.View`
  flex: 1;
  align-items: center;
  padding: ${verticalScale(12)}px ${scale(4)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  margin-horizontal: ${scale(4)}px;
  elevation: 3;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  gap: ${verticalScale(2)}px;
`;

export const StatPillIcon = styled.View`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(10)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}14`};
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(4)}px;
`;

export const Root = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
