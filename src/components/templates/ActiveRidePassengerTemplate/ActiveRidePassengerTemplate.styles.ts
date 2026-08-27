import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
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

export const HeroCard = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [
    theme.colors.primary,
    theme.colors.primary_container || '#004390',
  ],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
}))`
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(22)}px;
  margin-bottom: ${verticalScale(14)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 16px;
  elevation: 8;
`;

export const HeroBadgeContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.2);
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(12)}px;
  align-self: flex-start;
  margin-bottom: ${verticalScale(4)}px;
`;

export const HeroLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  letter-spacing: 1.2px;
  text-transform: uppercase;
`;

export const ETARow = styled.View`
  flex-direction: row;
  align-items: baseline;
  gap: ${scale(6)}px;
  margin-top: ${verticalScale(2)}px;
`;

export const ETANumber = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(42)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  letter-spacing: -1px;
`;

export const ETAMinutesText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_primary}DD;
`;

export const NextStopContainer = styled.View`
  margin-top: ${verticalScale(10)}px;
  background-color: rgba(255, 255, 255, 0.15);
  padding: ${moderateScale(12)}px;
  border-radius: ${moderateScale(14)}px;
`;

export const NextStopRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(8)}px;
`;

export const NextStopText = styled.Text`
  flex: 1;
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(13)}px;
  line-height: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const HeroActionsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  margin-top: ${verticalScale(10)}px;
  padding-left: ${scale(24)}px;
`;

export const HeroActionPill = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${scale(5)}px;
  background-color: rgba(255, 255, 255, 0.22);
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(5)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const HeroActionPillText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const DistancePill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  margin-top: ${verticalScale(12)}px;
  background-color: rgba(255, 255, 255, 0.22);
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(20)}px;
  align-self: flex-start;
`;

export const DistanceText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const LiveLocationCard = styled.View<{ $active: boolean }>`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_lowest || theme.colors.surface};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(14)}px;
  border-width: 1px;
  border-color: ${({ theme, $active }) =>
    $active ? `${theme.colors.primary}30` : 'transparent'};
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 3;
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

export const LiveLocationIconContainer = styled.View<{ $active: boolean }>`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme, $active }) =>
    $active ? `${theme.colors.primary}18` : theme.colors.surface_container_low};
  align-items: center;
  justify-content: center;
`;

export const LiveLocationTextGroup = styled.View`
  flex: 1;
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
  background-color: #22c55e20;
  padding-horizontal: ${scale(7)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(6)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const LiveDot = styled.View`
  width: ${moderateScale(5)}px;
  height: ${moderateScale(5)}px;
  border-radius: 3px;
  background-color: #22c55e;
`;

export const LiveBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(9)}px;
  color: #15803d;
  letter-spacing: 0.5px;
`;

export const LiveLocationSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(8)}px;
  line-height: ${verticalScale(16)}px;
`;

export const DriverCard = styled.View`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_lowest || theme.colors.surface};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(18)}px;
  margin-bottom: ${verticalScale(14)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 3;
`;

export const DriverHeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(14)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const AvatarWrapper = styled.View`
  position: relative;
`;

export const RatingBadge = styled.View`
  position: absolute;
  bottom: -2px;
  right: -2px;
  background-color: #f59e0b;
  padding-horizontal: ${scale(6)}px;
  padding-vertical: ${verticalScale(1.5)}px;
  border-radius: ${moderateScale(6)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(2)}px;
`;

export const RatingBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: #ffffff;
`;

export const DriverInfo = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const DriverNameRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const DriverNameText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(17)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const DriverPhoneText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const ActionButtonsGrid = styled.View`
  flex-direction: row;
  gap: ${scale(10)}px;
`;

export const ChatButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  padding-vertical: ${verticalScale(12)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const ChatButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const CallButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  padding-vertical: ${verticalScale(12)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
`;

export const CallButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const VehicleCard = styled.View`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_lowest || theme.colors.surface};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(14)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 3;
`;

export const VehicleTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  margin-bottom: ${verticalScale(10)}px;
`;

export const VehicleIconContainer = styled.View`
  width: ${moderateScale(42)}px;
  height: ${moderateScale(42)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}14`};
  align-items: center;
  justify-content: center;
`;

export const VehicleInfoGroup = styled.View`
  flex: 1;
`;

export const VehicleTitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const VehicleModelLight = styled.Text`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const VehicleBadgesRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${scale(6)}px;
`;

export const VehicleBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(5)}px;
  border-radius: ${moderateScale(8)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(5)}px;
`;

export const VehicleBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const ColorDot = styled.View<{ $color?: string }>`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: 4px;
  background-color: ${({ $color }) => $color || '#6b7280'};
`;

export const TimelineCard = styled.View`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_lowest || theme.colors.surface};
  border-radius: ${moderateScale(22)}px;
  padding: ${moderateScale(18)}px;
  gap: ${verticalScale(16)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 3;
  margin-bottom: ${verticalScale(14)}px;
`;

export const TimelineHeader = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.7;
`;

export const SafetyCenterButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => `${theme.colors.error || '#ba1a1a'}12`};
  padding-vertical: ${verticalScale(15)}px;
  border-radius: ${moderateScale(18)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(10)}px;
  margin-top: ${verticalScale(8)}px;
`;

export const SafetyCenterButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.error || '#ba1a1a'};
`;
