import styled from 'styled-components/native';
import { moderateScale, verticalScale, scale } from '@/styles';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: ${verticalScale(20)}px;
  padding-top: ${verticalScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-top-left-radius: ${moderateScale(24)}px;
  border-top-right-radius: ${moderateScale(24)}px;
  elevation: 10;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px -10px;
  shadow-opacity: 0.1;
  shadow-radius: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;


export const NavItem = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(4)}px;
  position: relative;
  padding-horizontal: ${moderateScale(16)}px;
  padding-vertical: ${moderateScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ active, theme }) => active ? theme.colors.primary_container + '33' : 'transparent'};
`;

export const Badge = styled.View`
  position: absolute;
  top: ${verticalScale(4)}px;
  right: ${scale(18)}px;
  background-color: ${({ theme }) => theme.colors.error};
  min-width: ${moderateScale(16)}px;
  height: ${moderateScale(16)}px;
  border-radius: ${moderateScale(8)}px;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${scale(4)}px;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.surface};
  z-index: 10;
`;

export const BadgeText = styled.Text`
  color: #FFFFFF;
  font-size: ${moderateScale(9)}px;
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
`;
