import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const CardContainer = styled.Pressable<{ isSelected: boolean }>`
  width: ${scale(300)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  margin-right: ${scale(12)}px;
  border-width: ${moderateScale(2)}px;
  border-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : 'transparent'};
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 6px;
  shadow-opacity: ${({ isSelected }) => (isSelected ? 0.22 : 0.08)};
  shadow-radius: ${moderateScale(12)}px;
  elevation: ${({ isSelected }) => (isSelected ? 8 : 3)};
`;

export const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(10)}px;
`;

export const DriverInfo = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-right: ${scale(8)}px;
`;

export const DriverTextCol = styled.View`
  margin-left: ${scale(10)}px;
  flex: 1;
`;

export const DriverNameRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RatingChip = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding-horizontal: ${scale(6)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(6)}px;
  align-self: flex-start;
  margin-top: ${verticalScale(3)}px;
`;

export const PriceTag = styled.View`
  align-items: flex-end;
`;

export const SeatsBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary_container};
  padding-horizontal: ${scale(6)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(6)}px;
  margin-top: ${verticalScale(2)}px;
`;

export const SpacedLabel = styled.View`
  margin-left: ${scale(4)}px;
`;

export const DetailsDivider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.surface_variant};
  margin-vertical: ${verticalScale(8)}px;
  opacity: 0.6;
`;

export const InfoGrid = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(10)}px;
`;

export const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BottomRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${verticalScale(4)}px;
`;

export const DistanceBadge = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary_container}18;
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(5)}px;
  border-radius: ${moderateScale(8)}px;
  flex: 1;
  margin-right: ${scale(8)}px;
`;

export const ActionButton = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(7)}px;
  border-radius: ${moderateScale(10)}px;
  flex-direction: row;
  align-items: center;
`;
