import styled from 'styled-components/native';
import { moderateScale, verticalScale } from '@/styles';

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
  align-items: center;
  justify-content: center;
  gap: ${moderateScale(4)}px;
  padding-horizontal: ${moderateScale(16)}px;
  padding-vertical: ${moderateScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ active, theme }) => active ? theme.colors.primary_container + '33' : 'transparent'};
`;
