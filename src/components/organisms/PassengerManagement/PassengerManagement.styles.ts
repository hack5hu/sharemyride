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

export const PassengerItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${verticalScale(12)}px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${({ theme }) => theme.colors.outline_variant};
`;

export const PassengerInfo = styled.View`
  flex: 1;
  margin-left: ${scale(12)}px;
`;

export const SeatBadge = styled.View`
  margin-top: ${verticalScale(4)}px;
  align-self: flex-start;
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(4)}px;
`;



export const CoRidersRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AvatarStack = styled.View`
  flex-direction: row;
  margin-right: ${scale(12)}px;
`;

export const CoRiderAvatar = styled.Image<{ offset: number }>`
  width: ${moderateScale(28)}px;
  height: ${moderateScale(28)}px;
  border-radius: ${moderateScale(14)}px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.surface};
  margin-left: ${({ offset }) => (offset > 0 ? -moderateScale(10) : 0)}px;
`;

export const EmptySeatPill = styled.View`
  margin-left: auto;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(12)}px;
  gap: ${scale(4)}px;
`;

export const CoRiderRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  padding-vertical: ${verticalScale(8)}px;
`;
