import styled from 'styled-components/native';
import { moderateScale, verticalScale } from '@/styles';

export const ToggleContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(6)}px;
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
`;

export const ToggleButton = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  padding-vertical: ${verticalScale(10)}px;
  border-radius: ${moderateScale(8)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.surface_container_lowest : 'transparent'};
  shadow-color: ${({ theme, isActive }) => (isActive ? theme.colors.shadow : 'transparent')};
  shadow-offset: 0px 1px;
  shadow-opacity: ${({ isActive }) => (isActive ? 0.08 : 0)};
  shadow-radius: 4px;
  elevation: ${({ isActive }) => (isActive ? 2 : 0)};
`;
