import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface_container};
`;

export const MapImageBackground = styled.ImageBackground`
  width: ${width}px;
  height: ${height}px;
  position: absolute;
`;

export const GradientOverlay = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [`${theme.colors.surface}E6`, 'transparent', 'transparent', `${theme.colors.surface}E6`],
  locations: [0, 0.2, 0.8, 1],
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

/* Map Pin Styles */

export const PinContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  align-items: center;
  /* Shift slightly to center the bottom point of the pin */
  transform: translateX(-${moderateScale(24)}px) translateY(-${moderateScale(48)}px);
  z-index: 10;
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

export const PinCircle = styled.View`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-width: ${moderateScale(4)}px;
  border-color: ${({ theme }) => theme.colors.on_primary};
  align-items: center;
  justify-content: center;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 20px;
  shadow-opacity: 0.3;
  shadow-radius: 20px;
  elevation: 10;
`;

export const PinShadow = styled.View`
  position: absolute;
  bottom: -4px;
  width: ${moderateScale(16)}px;
  height: ${verticalScale(4)}px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 9999px;
`;
