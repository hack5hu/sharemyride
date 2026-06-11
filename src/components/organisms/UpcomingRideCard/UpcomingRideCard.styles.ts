import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(20)}px;
  gap: ${verticalScale(16)}px;
  shadow-color: ${({ theme }) => theme.colors.on_background};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 24px;
  elevation: 3;
  margin-bottom: ${verticalScale(16)}px;
  overflow: hidden;
`;

export const AccentBar = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${scale(5)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TimerBadge = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary_container};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: 9999px;
  gap: ${scale(8)}px;
`;

export const TimerText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(12)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_secondary_container};
`;

export const StatusTag = styled.View<{ status?: string }>`
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  background-color: ${({ theme, status }) => {
    if (status === 'PENDING') return theme.colors.warning + '1c'; // ~11% opacity
    return theme.colors.primary + '14'; // ~8% opacity
  }};
  border-radius: 9999px;
`;

export const StatusTagText = styled.Text<{ status?: string }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(10)}px;
  font-weight: 800;
  text-transform: uppercase;
  color: ${({ theme, status }) => {
    if (status === 'PENDING') return theme.colors.warning;
    return theme.colors.primary;
  }};
  letter-spacing: 0.8px;
`;

export const ProfileWrapper = styled.View`
  padding-vertical: ${verticalScale(4)}px;
`;

export const ReportButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
`;

