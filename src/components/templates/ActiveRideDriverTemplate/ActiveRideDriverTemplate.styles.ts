import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: verticalScale(32),
  },
})`
  flex: 1;
`;

export const HeroSection = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(24)}px;
  padding-bottom: ${verticalScale(32)}px;
  border-bottom-left-radius: ${moderateScale(28)}px;
  border-bottom-right-radius: ${moderateScale(28)}px;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.12;
  shadow-radius: 16px;
  elevation: 8;
`;

export const NextStopBadge = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.primary_fixed_dim || '#a7d0b8'};
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: ${verticalScale(6)}px;
`;

export const PassengerName = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(32)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  text-align: center;
`;

export const MetricsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(40)}px;
  margin-top: ${verticalScale(18)}px;
`;

export const MetricBlock = styled.View`
  align-items: center;
`;

export const MetricLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.primary_fixed_dim || '#a7d0b8'};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.8;
`;

export const MetricValue = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(20)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  margin-top: ${verticalScale(2)}px;
`;

export const BodyContent = styled.View`
  padding-horizontal: ${scale(16)}px;
  padding-top: ${verticalScale(20)}px;
  gap: ${verticalScale(24)}px;
`;

export const LiveLocationCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(18)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LiveLocationLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const LiveLocationText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const StopsSection = styled.View`
  gap: ${verticalScale(12)}px;
`;

export const StopsHeader = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  letter-spacing: 1.8px;
  text-transform: uppercase;
  padding-horizontal: ${scale(4)}px;
  opacity: 0.8;
`;

export const StopGroupName = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  padding-horizontal: ${scale(4)}px;
  margin-top: ${verticalScale(8)}px;
  margin-bottom: ${verticalScale(4)}px;
`;

export const VehicleStatusSection = styled.View`
  padding-vertical: ${verticalScale(16)}px;
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(4)}px;
`;

export const VehicleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const BatteryText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const SafetyButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.error_container || '#ffdad6'};
  padding-vertical: ${verticalScale(16)}px;
  border-radius: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(10)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
`;

export const SafetyButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_error_container || '#93000a'};
`;
