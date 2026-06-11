import styled from 'styled-components/native';
import { verticalScale, moderateScale, scale } from '@/styles';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(24)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const BadgeWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary_container};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${({ theme }) => theme.roundness.full}px;
`;

export const DateTimeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(11)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const RouteWrapper = styled.View`
  margin-top: ${verticalScale(8)}px;
`;
