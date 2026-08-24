import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const StopCard = styled.View`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_lowest || theme.colors.surface};
  padding: ${moderateScale(14)}px;
  border-radius: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
`;

export const TimelineColumn = styled.View`
  align-items: center;
  justify-content: center;
  width: ${scale(14)}px;
`;

export const TimelineDot = styled.View<{ $active?: boolean }>`
  width: ${moderateScale(10)}px;
  height: ${moderateScale(10)}px;
  border-radius: ${moderateScale(5)}px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.surface_variant};
`;

export const TimelineLine = styled.View`
  width: 1.5px;
  height: ${verticalScale(30)}px;
  background-color: ${({ theme }) => theme.colors.surface_variant};
  margin-top: ${verticalScale(4)}px;
`;

export const PassengerInfo = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const PassengerNameText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const PassengerSubtitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 400;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const ActionButtonsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const ActionIconButton = styled.TouchableOpacity`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container};
  align-items: center;
  justify-content: center;
`;
