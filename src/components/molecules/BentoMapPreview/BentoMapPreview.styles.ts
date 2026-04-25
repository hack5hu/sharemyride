import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';
import { OlaMap } from '@/components/organisms/OlaMap';


export const Container = styled.View`
  margin-top: ${verticalScale(32)}px;
  overflow: hidden;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container};
  height: ${verticalScale(192)}px; /* ~48 in tailwind size */
  position: relative;
`;
export const MapWrapper = styled.View`
  flex: 1;
`;

export const StyledOlaMap = styled(OlaMap)`
  flex: 1;
`;

export const ControlsWrapper = styled.View`
  position: absolute;
  right: ${moderateScale(12)}px;
  bottom: ${moderateScale(40)}px;
  z-index: 10;
`;

export const MapImage = styled.Image`
  width: 100%;
  height: 100%;
  opacity: 0.8;
`;

export const GradientOverlay = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
`;

export const BadgeContainer = styled.View`
  position: absolute;
  bottom: ${verticalScale(16)}px;
  left: ${scale(16)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}E6`}; /* 90% opacity roughly */
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: 9999px;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

export const BadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;
