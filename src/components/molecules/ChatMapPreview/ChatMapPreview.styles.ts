import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import { OlaMap } from '@/components/organisms/OlaMap';

export const Container = styled.TouchableOpacity`
  width: ${scale(240)}px;
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
`;

export const MapWrapper = styled.View`
  height: ${verticalScale(140)}px;
  width: 100%;
  position: relative;
`;

export const StyledOlaMap = styled(OlaMap)`
  flex: 1;
`;

export const InfoContainer = styled.View`
  padding: ${moderateScale(8)}px ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const LocationName = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const Address = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;

export const MarkerOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

export const PinIcon = styled.View`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  align-items: center;
  justify-content: center;
`;
