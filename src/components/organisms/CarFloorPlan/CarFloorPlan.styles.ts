import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const FloorPlanContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(40)}px;
  padding: ${moderateScale(32)}px ${scale(24)}px;
  max-width: ${scale(280)}px;
  align-self: center;
  width: 100%;
  position: relative;
`;

export const Windshield = styled.View`
  position: absolute;
  top: 0;
  align-self: center;
  width: 75%;
  height: ${moderateScale(24)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
  border-bottom-left-radius: ${moderateScale(24)}px;
  border-bottom-right-radius: ${moderateScale(24)}px;
`;

export const SeatsWrapper = styled.View`
  margin-top: ${verticalScale(16)}px;
  gap: ${verticalScale(24)}px;
`;

export const SeatRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${scale(8)}px;
`;

export const TrunkBar = styled.View`
  margin-top: ${verticalScale(16)}px;
  align-self: center;
  width: 50%;
  height: ${moderateScale(8)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
  border-radius: 9999px;
  opacity: 0.5;
`;
