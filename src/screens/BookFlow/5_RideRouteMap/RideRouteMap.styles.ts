import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';
import { OlaMap } from '@/components/organisms/OlaMap';

export const Container = styled.View`
  flex: 1;
`;

export const MapWrapper = styled.View`
  flex: 1;
`;


export const StyledOlaMap = styled(OlaMap)`
  flex: 1;
`;


export const ControlsWrapper = styled.View`
  position: absolute;
  right: ${moderateScale(16)}px;
  top: 40%;
`;

export const Footer = styled.View`
  position: absolute;
  bottom: ${moderateScale(56)}px;
  left: ${moderateScale(16)}px;
  right: ${moderateScale(16)}px;
`;

export const MapButtonGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.primary, theme.colors.primary],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
}))`
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
  elevation: 6;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
`;

export const MapButton = styled.TouchableOpacity`
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(16)}px;
  align-items: center;
  justify-content: center;
`;
