import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

/* Header Step Indicator */
export const HeaderStepText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  letter-spacing: 1px;
`;

/* Main Content — fills space below the ScreenShell header */
export const ContentArea = styled.View`
  flex: 1;
  position: relative;
`;

/* Map wrapper — absolute fill behind overlays */
export const MapLayer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

/* Search overlay — positioned above map */
export const SearchOverlayLayer = styled.View`
  flex: 1;
  z-index: 10;
`;

/* Map gradient overlay (top + bottom fade) */
export const MapGradientOverlay = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [`${theme.colors.surface}E6`, 'transparent', 'transparent', `${theme.colors.surface}E6`],
  locations: [0, 0.15, 0.85, 1],
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
`;

/* Bottom card container */
export const BottomCard = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding: ${moderateScale(16)}px ${scale(24)}px;
  padding-bottom: ${verticalScale(32)}px;
`;

/* Bottom card gradient background */
export const BottomGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: ['transparent', `${theme.colors.surface}E6`, theme.colors.surface],
  locations: [0, 0.3, 1],
}))`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
`;

/* Stop info card */
export const StopInfoCard = styled.View`
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}F2`};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(12)}px;
  shadow-color: rgb(0, 0, 0);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 4;
`;

export const StopInfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StopInfoLeft = styled.View`
  flex: 1;
  margin-right: ${scale(12)}px;
`;

export const StopNameText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(2)}px;
`;

export const StopAddressText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

/* Distance badge — appears inside the stop info card */
export const DistancePill = styled.View<{ isWarning?: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, isWarning }) =>
    isWarning ? `${theme.colors.error}1A` : `${theme.colors.primary}1A`};
  padding: ${verticalScale(4)}px ${scale(10)}px;
  border-radius: 9999px;
  gap: ${scale(4)}px;
`;

export const DistancePillText = styled.Text<{ isWarning?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme, isWarning }) =>
    isWarning ? theme.colors.error : theme.colors.primary};
`;



/* Search bar floating on map (non-search mode) */
export const FloatingSearchBar = styled.TouchableOpacity`
  position: absolute;
  top: ${verticalScale(12)}px;
  left: ${scale(24)}px;
  right: ${scale(24)}px;
  z-index: 15;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => `${theme.colors.surface}F2`};
  padding: ${moderateScale(14)}px ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  shadow-color: rgb(0, 0, 0);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 3;
  gap: ${scale(12)}px;
`;

export const FloatingSearchText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => `${theme.colors.outline_variant}99`};
  flex: 1;
`;

/* Map marker dot styles */
export const MarkerDot = styled.View<{ color?: string; size?: number }>`
  width: ${({ size }) => moderateScale(size ?? 12)}px;
  height: ${({ size }) => moderateScale(size ?? 12)}px;
  border-radius: 9999px;
  background-color: ${({ theme, color }) => color || theme.colors.primary};
  shadow-color: ${({ theme, color }) => color || theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 3;
`;

export const MarkerDotOuter = styled.View<{ color?: string }>`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: 9999px;
  background-color: ${({ theme, color }) => `${color || theme.colors.primary}33`};
  align-items: center;
  justify-content: center;
`;

/* Selected stop marker */
export const SelectedMarkerContainer = styled.View`
  align-items: center;
`;

export const SelectedMarkerPin = styled.View`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 5;
`;

export const SelectedMarkerShadow = styled.View`
  width: ${moderateScale(16)}px;
  height: ${verticalScale(4)}px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 9999px;
  margin-top: ${verticalScale(2)}px;
`;

/* Floating footer for stops count */
export const SearchFloatingFooter = styled.View`
  position: absolute;
  bottom: ${verticalScale(32)}px;
  left: ${scale(24)}px;
  right: ${scale(24)}px;
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}E6`};
  border-radius: 9999px;
  padding: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  shadow-color: rgb(0, 0, 0);
  shadow-offset: 0px 10px;
  shadow-opacity: 0.1;
  shadow-radius: 20px;
  elevation: 10;
  z-index: 50;
`;

export const FooterLeftText = styled.View`
  padding-horizontal: ${scale(8)}px;
`;

export const FooterLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.outline_variant};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const FooterValue = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const SearchContinueButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${scale(32)}px;
  padding-vertical: ${verticalScale(12)}px;
  border-radius: 9999px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
  elevation: 5;
`;

export const SearchContinueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

/* Map Pin Styles for Centered Picker */
export const PinContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 0;
  align-items: center;
  z-index: 10;
`;

export const PinWrapper = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: center;
`;

export const TooltipBubble = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${verticalScale(8)}px ${scale(16)}px;
  border-radius: 9999px;
  margin-bottom: ${verticalScale(16)}px;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 10px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 8;
`;

export const TooltipText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  letter-spacing: 1px;
`;

export const PinShadow = styled.View`
  position: absolute;
  bottom: -4px;
  width: ${moderateScale(16)}px;
  height: ${verticalScale(4)}px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 9999px;
`;

export const WarningBanner = styled.View`
  position: absolute;
  top: ${verticalScale(76)}px;
  left: ${scale(24)}px;
  right: ${scale(24)}px;
  background-color: ${({ theme }) => `${theme.colors.surface}FA`};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(12)}px ${scale(16)}px;
  shadow-color: rgb(0, 0, 0);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
  z-index: 15;
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const WarningContent = styled.View`
  flex: 1;
`;

export const WarningTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${verticalScale(2)}px;
`;

export const WarningDescription = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(15)}px;
`;
