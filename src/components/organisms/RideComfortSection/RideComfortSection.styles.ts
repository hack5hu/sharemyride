import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const SectionCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(18)}px ${moderateScale(20)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 16px;
  elevation: 3;
`;

export const SectionLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const SectionDot = styled.View<{ color?: string }>`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ theme, color }) => color || theme.colors.primary};
  margin-right: ${scale(8)}px;
`;

export const ChipsWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8)}px;
`;

export const PreferenceChip = styled.View<{ accent?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${verticalScale(8)}px ${scale(14)}px;
  background-color: ${({ theme, accent }) =>
    accent ? `${theme.colors.error}14` : theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
  gap: ${scale(8)}px;
`;
