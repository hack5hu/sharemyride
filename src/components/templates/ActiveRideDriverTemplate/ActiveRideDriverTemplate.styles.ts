import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: verticalScale(40),
  },
})`
  flex: 1;
`;

export const BodyContent = styled.View`
  padding-horizontal: ${scale(16)}px;
  padding-top: ${verticalScale(16)}px;
  gap: ${verticalScale(20)}px;
`;

export const LiveLocationCard = styled.View<{ $active?: boolean }>`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_lowest || theme.colors.surface};
  padding: ${moderateScale(18)}px;
  border-radius: ${moderateScale(22)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 14px;
  elevation: 3;
  gap: ${verticalScale(12)}px;
`;

export const LiveLocationTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LiveLocationLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  flex: 1;
`;

export const LiveLocationIconContainer = styled.View<{ $active?: boolean }>`
  width: ${moderateScale(42)}px;
  height: ${moderateScale(42)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme, $active }) =>
    $active
      ? `${theme.colors.primary}18`
      : `${theme.colors.on_surface_variant}12`};
  align-items: center;
  justify-content: center;
`;

export const LiveLocationTextGroup = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const LiveLocationTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const LiveLocationText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const LiveBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}14`};
  padding-horizontal: ${scale(6)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const LiveDot = styled.View`
  width: ${moderateScale(6)}px;
  height: ${moderateScale(6)}px;
  border-radius: ${moderateScale(3)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const LiveBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
`;

export const LiveLocationSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 400;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${verticalScale(16)}px;
`;

export const StopsSection = styled.View`
  gap: ${verticalScale(10)}px;
`;

export const StopsHeader = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  letter-spacing: 1.8px;
  text-transform: uppercase;
  padding-horizontal: ${scale(4)}px;
  opacity: 0.7;
`;

export const StopGroupNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  margin-top: ${verticalScale(10)}px;
  margin-bottom: ${verticalScale(4)}px;
  padding-horizontal: ${scale(4)}px;
`;

export const StopGroupName = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  flex: 1;
`;

export const VehicleCard = styled.View`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_lowest || theme.colors.surface};
  padding: ${moderateScale(14)}px ${moderateScale(16)}px;
  border-radius: ${moderateScale(20)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 3px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
  margin-top: ${verticalScale(4)}px;
`;

export const VehicleIconContainer = styled.View`
  width: ${moderateScale(42)}px;
  height: ${moderateScale(42)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  align-items: center;
  justify-content: center;
`;

export const VehicleInfoGroup = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const VehicleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const VehicleTextLight = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 400;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const VehicleSubtext = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const SafetyButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => `${theme.colors.error || '#ba1a1a'}14`};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(20)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(10)}px;
  margin-top: ${verticalScale(8)}px;
`;

export const SafetyButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.error || '#ba1a1a'};
`;
