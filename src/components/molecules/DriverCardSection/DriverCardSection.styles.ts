import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const DriverCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(18)}px;
  margin-bottom: ${verticalScale(16)}px;
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
  background-color: ${({ theme }) => theme.colors.tertiary || '#4f53a6'};
  padding-horizontal: ${scale(5)}px;
  padding-vertical: ${verticalScale(1)}px;
  border-radius: ${moderateScale(6)}px;
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

export const DriverNameText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const VehicleInfoText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 400;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const LicensePlateText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const ActionButtonsGrid = styled.View`
  flex-direction: row;
  gap: ${scale(12)}px;
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
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
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
  background-color: transparent;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const CallButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;
