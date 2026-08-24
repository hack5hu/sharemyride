import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const FloorPlanContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(48)}px;
  padding: ${moderateScale(32)}px ${scale(20)}px;
  padding-top: ${moderateScale(56)}px;
  padding-bottom: ${moderateScale(36)}px;
  width: ${scale(310)}px;
  align-self: center;
  position: relative;
  elevation: 4;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.08;
  shadow-radius: 24px;
`;

export const Windshield = styled.View`
  position: absolute;
  top: ${moderateScale(12)}px;
  align-self: center;
  width: 72%;
  height: ${moderateScale(30)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-top-left-radius: ${moderateScale(16)}px;
  border-top-right-radius: ${moderateScale(16)}px;
  border-bottom-left-radius: ${moderateScale(28)}px;
  border-bottom-right-radius: ${moderateScale(28)}px;
`;

export const Mirror = styled.View<{ side: 'left' | 'right' }>`
  position: absolute;
  top: ${moderateScale(44)}px;
  ${({ side }) => (side === 'left' ? 'left: -8px;' : 'right: -8px;')}
  width: ${moderateScale(10)}px;
  height: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(6)}px;
`;

export const SeatsWrapper = styled.View`
  margin-top: ${verticalScale(8)}px;
  gap: ${verticalScale(24)}px;
`;

export const SeatRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const TrunkBar = styled.View`
  margin-top: ${verticalScale(28)}px;
  align-self: center;
  width: 44%;
  height: ${moderateScale(5)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: 9999px;
`;
