import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const StopCard = styled.View`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_lowest || theme.colors.surface};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(20)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 3;
  gap: ${verticalScale(12)}px;
`;

export const CardTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const AvatarWrapper = styled.View`
  position: relative;
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

export const SeatTag = styled.View`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_high || theme.colors.surface_variant};
  padding-horizontal: ${scale(6)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(6)}px;
  align-self: flex-start;
  margin-top: ${verticalScale(2)}px;
`;

export const SeatTagText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(10)}px;
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
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme }) =>
    theme.colors.surface_container_high || theme.colors.surface_variant};
  align-items: center;
  justify-content: center;
`;

export const MetricsStrip = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  width: 100%;
`;

export const MetricPill = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const MetricTextGroup = styled.View`
  flex: 1;
  gap: ${verticalScale(1)}px;
`;

export const MetricLabelText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(9)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MetricValueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.primary};
`;
