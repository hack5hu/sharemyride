import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const IndicatorWrapper = styled.View`
  align-items: center;
  gap: ${verticalScale(4)}px;
`;

export const Dot = styled.View<{ color: string; isSquare?: boolean }>`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${({ isSquare }) => (isSquare ? moderateScale(2) : moderateScale(4))}px;
  background-color: ${({ color }) => color};
`;

export const Line = styled.View`
  width: 1px;
  height: ${verticalScale(24)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant};
`;

export const Content = styled.View`
  flex: 1;
  gap: ${verticalScale(16)}px;
`;

export const StopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StopText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
  flex: 1;
  margin-right: ${scale(8)}px;
`;

export const TimeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(11)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;
