import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary_fixed};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(20)}px;
  gap: ${verticalScale(16)}px;
  position: relative;
  overflow: hidden;
  shadow-color: ${({ theme }) => theme.colors.on_background};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
`;

export const GhostIconWrapper = styled.View`
  position: absolute;
  top: ${verticalScale(12)}px;
  right: ${scale(12)}px;
  opacity: 0.08;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const RouteSummary = styled.View`
  gap: ${verticalScale(8)}px;
`;

export const RouteItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const StopPoint = styled.View`
  width: ${moderateScale(2)}px;
  height: ${verticalScale(12)}px;
  background-color: ${({ theme }) => theme.colors.on_primary_fixed_variant + '33'};
  margin-left: ${scale(11)}px;
`;

export const StopLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(13)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_primary_fixed_variant};
`;

export const ActionButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.on_primary_fixed_variant};
  padding-vertical: ${verticalScale(14)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
`;

export const ActionText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary_fixed};
`;
