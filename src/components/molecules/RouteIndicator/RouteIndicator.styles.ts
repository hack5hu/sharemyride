import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(12)}px;
`;

export const TrackContainer = styled.View`
  align-items: center;
  padding-vertical: ${verticalScale(4)}px;
`;

export const DotMark = styled.View<{ color: string }>`
  width: ${moderateScale(10)}px;
  height: ${moderateScale(10)}px;
  border-radius: ${moderateScale(5)}px;
  background-color: ${({ color }) => color};
  border-width: ${moderateScale(2)}px;
  border-color: ${({ theme, color }) => color + '33'};
`;

export const DashLine = styled.View`
  width: 0.5px;
  height: ${verticalScale(30)}px;
  border-left-width: 0.5px;
  border-left-color: ${({ theme }) => theme.colors.outline_variant};
  border-style: dashed;
`;

export const InfoContainer = styled.View`
  gap: ${verticalScale(16)}px;
`;

export const LocationBlock = styled.View`
  gap: ${verticalScale(2)}px;
`;
