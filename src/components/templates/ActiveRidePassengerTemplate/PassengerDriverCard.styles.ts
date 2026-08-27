import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const DriverCard = styled.View`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_lowest || theme.colors.surface};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(12)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 3;
  gap: ${verticalScale(14)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant || '#e2e2e2'}30`};
`;

export const DriverHeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const AvatarWrapper = styled.View`
  position: relative;
`;

export const RatingBadge = styled.View`
  position: absolute;
  bottom: -2px;
  right: -2px;
  background-color: #f59e0b;
  padding-horizontal: ${scale(5)}px;
  padding-vertical: ${verticalScale(1.5)}px;
  border-radius: ${moderateScale(5)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(2)}px;
`;

export const RatingBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(9.5)}px;
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
  font-size: ${responsiveFont(16)}px;
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
  padding-vertical: ${verticalScale(11)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 2;
`;

export const ChatButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(13.5)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const CallButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  padding-vertical: ${verticalScale(11)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
`;

export const CallButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(13.5)}px;
  color: ${({ theme }) => theme.colors.primary};
`;
