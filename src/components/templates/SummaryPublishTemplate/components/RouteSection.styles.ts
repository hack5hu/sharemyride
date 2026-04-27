import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const GlassCard = styled.View`
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}99`};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(20)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.on_surface}1A`};
  margin-bottom: ${verticalScale(16)}px;
`;

export const RouteHeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const RouteLayout = styled.View`
  flex-direction: row;
  gap: ${scale(12)}px;
  flex: 1;
`;

export const TimelineLine = styled.View`
  align-items: center;
  padding-top: ${verticalScale(4)}px;
`;

export const TimelineDotOutline = styled.View`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-width: 3px;
  border-color: ${({ theme }) => `${theme.colors.primary_container}4D`};
`;

export const TimelineTrack = styled(LinearGradient)`
  width: 2px;
  height: ${verticalScale(40)}px;
  margin-vertical: ${verticalScale(4)}px;
`;

export const TimelineDotEnd = styled.View`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  border-radius: 6px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.on_primary};
`;

export const RouteDetailsStack = styled.View`
  gap: ${verticalScale(24)}px;
  flex: 1;
`;

export const RouteStop = styled.View``;

export const StopLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  margin-bottom: ${verticalScale(2)}px;
`;

export const StopLocation = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const StopTime = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;

export const EditButton = styled.TouchableOpacity`
  padding: ${moderateScale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: 9999px;
`;
