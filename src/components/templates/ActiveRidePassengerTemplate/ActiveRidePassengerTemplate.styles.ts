import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(36),
  },
})`
  flex: 1;
`;

export const HeroCard = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_container};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(20)}px;
  margin-bottom: ${verticalScale(16)}px;
  position: relative;
  overflow: hidden;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 4;
`;

export const HeroContent = styled.View`
  gap: ${verticalScale(4)}px;
  z-index: 2;
`;

export const HeroLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_primary_container};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.85;
`;

export const ETARow = styled.View`
  flex-direction: row;
  align-items: baseline;
  gap: ${scale(6)}px;
  margin-top: ${verticalScale(2)}px;
`;

export const ETANumber = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(42)}px;
  color: ${({ theme }) => theme.colors.on_primary_container};
  line-height: ${verticalScale(48)}px;
`;

export const ETAMinutesText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_primary_container};
`;

export const NextStopText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_primary_container};
  opacity: 0.9;
  margin-top: ${verticalScale(4)}px;
`;

export const DistancePill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  margin-top: ${verticalScale(8)}px;
  background-color: rgba(255, 255, 255, 0.18);
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(5)}px;
  border-radius: ${moderateScale(20)}px;
  align-self: flex-start;
`;

export const DistanceText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_primary_container};
`;

export const WatermarkCar = styled.View`
  position: absolute;
  right: -${scale(12)}px;
  bottom: -${verticalScale(16)}px;
  opacity: 0.12;
  z-index: 1;
`;

export const LiveLocationCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(18)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(16)}px;
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

export const TimelineCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(18)}px;
  gap: ${verticalScale(20)}px;
`;

export const TimelineHeader = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  letter-spacing: 1.8px;
  text-transform: uppercase;
  opacity: 0.85;
`;

export const SafetyCenterButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.error_container};
  padding-vertical: ${verticalScale(16)}px;
  border-radius: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(10)}px;
  margin-top: ${verticalScale(24)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
`;

export const SafetyCenterButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_error_container};
`;
