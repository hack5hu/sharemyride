import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';
import { ViewStyle } from 'react-native';

// Static style for the OlaMap native component (StyleProp required, styled-components not applicable)
export const mapViewStyle: ViewStyle = { flex: 1 };

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const MapContainer = styled.View`
  flex: 1;
`;

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const BackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: ${verticalScale(50)}px;
  left: ${scale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
  padding: ${moderateScale(12)}px;
  border-radius: ${moderateScale(30)}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const InfoCard = styled.View`
  position: absolute;
  bottom: ${verticalScale(40)}px;
  left: ${scale(20)}px;
  right: ${scale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(24)}px;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.12;
  shadow-radius: 16px;
  elevation: 8;
`;

export const CenterMarkerContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -${scale(15)}px;
  margin-top: -${verticalScale(30)}px;
  align-items: center;
  justify-content: center;
`;

export const CenterMarkerPulse = styled.View`
  width: ${scale(10)}px;
  height: ${scale(10)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${scale(5)}px;
  opacity: 0.3;
  position: absolute;
  bottom: 0;
`;

export const ControlsWrapper = styled.View`
  position: absolute;
  right: ${scale(20)}px;
  bottom: ${verticalScale(240)}px;
`;

export const InfoCardTitle = styled.View`
  margin-bottom: ${verticalScale(4)}px;
`;

export const InfoCardSubtitle = styled.View`
  margin-bottom: ${verticalScale(16)}px;
`;

export const StyledOlaMap = styled.View`
  flex: 1;
`;
