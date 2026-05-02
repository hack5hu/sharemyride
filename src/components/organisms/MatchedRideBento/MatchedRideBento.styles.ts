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
  gap: ${verticalScale(5)}px;
`;

export const RouteItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(10)}px;
`;

export const StopPoint = styled.View`
  width: ${moderateScale(2)}px;
  height: ${verticalScale(12)}px;
  background-color: ${({ theme }) => theme.colors.on_primary_fixed_variant + '33'};
  margin-left: ${scale(7)}px;
`;

export const StopLabel = styled.Text`
  flex: 1;
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
  flex: 1;
`;

export const SecondaryButton = styled.TouchableOpacity`
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.on_primary_fixed_variant + '66'};
  padding-vertical: ${verticalScale(14)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ActionText = styled.Text<{ isSecondary?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  font-weight: 800;
  color: ${({ theme, isSecondary }) => isSecondary ? theme.colors.on_primary_fixed_variant : theme.colors.primary_fixed};
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${verticalScale(4)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.on_primary_fixed_variant + '1A'};
`;

export const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const InfoText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(12)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.on_primary_fixed_variant};
  opacity: 0.8;
`;

export const ActionButtonRow = styled.View`
  flex-direction: row;
  gap: ${scale(12)}px;
  margin-top: ${verticalScale(4)}px;
`;
