import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const SectionCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.roundness.md}px;
  padding: ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(16)}px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
`;

export const SectionLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const SectionDot = styled.View<{ color?: string }>`
  width: ${moderateScale(6)}px;
  height: ${moderateScale(6)}px;
  border-radius: ${moderateScale(3)}px;
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
  padding: ${moderateScale(8)}px ${moderateScale(12)}px;
  background-color: ${({ theme, accent }) => accent ? theme.colors.error_container : theme.colors.surface_container};
  border-radius: ${moderateScale(20)}px;
  gap: ${scale(6)}px;
`;
