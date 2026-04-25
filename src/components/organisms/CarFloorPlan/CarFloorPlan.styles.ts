import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const FloorPlanContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(42)}px;
  padding: ${moderateScale(36)}px ${scale(24)}px;
  padding-top: ${moderateScale(48)}px;
  width: ${scale(300)}px;
  align-self: center;
  position: relative;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
`;

export const Windshield = styled.View`
  position: absolute;
  top: ${moderateScale(10)}px;
  align-self: center;
  width: 70%;
  height: ${moderateScale(28)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
  border-radius: ${moderateScale(12)}px;
  border-bottom-left-radius: ${moderateScale(24)}px;
  border-bottom-right-radius: ${moderateScale(24)}px;
  opacity: 0.8;
`;

export const Mirror = styled.View<{ side: 'left' | 'right' }>`
  position: absolute;
  top: ${moderateScale(40)}px;
  ${({ side }) => (side === 'left' ? 'left: -6px;' : 'right: -6px;')}
  width: ${moderateScale(8)}px;
  height: ${moderateScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(4)}px;
  border-${({ side }) => (side === 'left' ? 'top-left' : 'top-right')}-radius: ${moderateScale(10)}px;
  border-${({ side }) => (side === 'left' ? 'bottom-left' : 'bottom-right')}-radius: ${moderateScale(10)}px;
`;

export const SeatsWrapper = styled.View`
  margin-top: ${verticalScale(4)}px;
  gap: ${verticalScale(25)}px;
`;

export const SeatRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const TrunkBar = styled.View`
  margin-top: ${verticalScale(24)}px;
  align-self: center;
  width: 40%;
  height: ${moderateScale(4)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant};
  border-radius: 9999px;
  opacity: 0.3;
`;
