import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const MapBackground = styled.Image`
  width: 100%;
  height: 100%;
`;

export const SearchBarWrapper = styled.View`
  position: absolute;
  top: ${verticalScale(16)}px;
  left: ${scale(16)}px;
  right: ${scale(16)}px;
  z-index: 40;
`;

export const SearchBarMock = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}E6`}; /* 90% opacity */
  padding: ${moderateScale(12)}px;
  border-radius: ${moderateScale(12)}px;
  shadow-color: rgb(0,107,71);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 24px;
  elevation: 4;
`;

export const SearchText = styled.Text`
  flex: 1;
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => `${theme.colors.on_surface_variant}99`}; /* placeholder style */
  margin-left: ${scale(12)}px;
  margin-right: ${scale(12)}px;
`;

export const IconButton = styled.View`
  padding: ${moderateScale(8)}px;
  border-radius: ${moderateScale(8)}px;
  background-color: transparent;
`;

export const BottomGradient = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${verticalScale(250)}px;
  justify-content: flex-end;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(48)}px;
  z-index: 40;
`;

export const TooltipCard = styled.View`
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}CC`}; /* 80% opacity */
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(16)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const TooltipVisual = styled.View`
  align-items: center;
  margin-top: ${verticalScale(4)}px;
`;

export const Dot = styled.View`
  width: ${moderateScale(10)}px;
  height: ${moderateScale(10)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.outline_variant};
`;

export const Line = styled.View`
  width: ${moderateScale(2)}px;
  height: ${verticalScale(32)}px;
  background-color: ${({ theme }) => `${theme.colors.outline_variant}4D`}; /* 30% opacity */
`;

export const TooltipContent = styled.View`
  flex: 1;
`;

export const TooltipLabel = styled.Text<{ isPrimary?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(10)}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme, isPrimary }) => isPrimary ? theme.colors.primary : theme.colors.on_surface_variant};
`;

export const TooltipValue = styled.Text<{ isBold?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  font-weight: ${({ isBold }) => isBold ? 700 : 500};
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${({ isBold }) => isBold ? 0 : verticalScale(16)}px;
`;

export const ContinueGradient = styled(LinearGradient)`
  width: 100%;
  padding-vertical: ${verticalScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.25;
  shadow-radius: 20px;
  elevation: 6;
`;

export const ContinueButton = styled.TouchableOpacity`
  width: 100%;
`;

export const ContinueButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const MapControls = styled.View`
  position: absolute;
  right: ${scale(16)}px;
  top: 50%;
  transform: translateY(-50px); /* rough center */
  gap: ${verticalScale(8)}px;
  z-index: 40;
`;

export const MapControlButton = styled.TouchableOpacity`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  align-items: center;
  justify-content: center;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 4;
`;

/* Floating Tooltip in Map Center */
export const MapCenterOverlay = styled.View`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-100px);
  z-index: 20;
`;

export const MapCenterTooltipBox = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(8)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.primary}1A`};
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 4;
`;

export const MapCenterLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const MapCenterTriangle = styled.View`
  position: absolute;
  bottom: -6px;
  left: ${scale(16)}px;
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  transform: rotate(45deg);
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.primary}1A`};
`;
