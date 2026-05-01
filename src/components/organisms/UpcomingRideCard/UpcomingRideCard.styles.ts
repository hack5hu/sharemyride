import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(20)}px;
  gap: ${verticalScale(16)}px;
  shadow-color: ${({ theme }) => theme.colors.on_background};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 24px;
  elevation: 4;
  margin-bottom: ${verticalScale(16)}px;
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

export const MoreButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
`;

export const ProfileWrapper = styled.View`
  padding-vertical: ${verticalScale(4)}px;
`;
