import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const BookingCard = styled.View`
  margin-horizontal: ${scale(24)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(28)}px;
  padding: ${moderateScale(28)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.05;
  shadow-radius: 24px;
  elevation: 4;
  position: relative;
  overflow: hidden;
`;

export const DecorativeAccent = styled.View`
  position: absolute;
  top: -${scale(40)}px;
  right: -${scale(40)}px;
  width: ${scale(120)}px;
  height: ${scale(120)}px;
  background-color: ${({ theme }) => `${theme.colors.primary_container}10`};
  border-radius: ${scale(60)}px;
`;

export const RouteContainer = styled.View`
  flex-direction: row;
  gap: ${scale(16)}px;
  margin-bottom: ${verticalScale(24)}px;
`;

export const RouteIndicator = styled.View`
  width: ${moderateScale(32)}px;
  gap: ${verticalScale(16)}px;
  position: relative;
`;

export const VisualLine = styled.View`
  position: absolute;
  width: 2px;
  left: 50%;
  margin-left: -1px;
  top: ${verticalScale(44)}px;
  bottom: ${verticalScale(32)}px;
  background-color: ${({ theme }) => `${theme.colors.outline_variant}40`};
  z-index: 1;
`;

export const SwapButtonWrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -${moderateScale(16)}px;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const SwapButton = styled.TouchableOpacity`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 2;
`;

export const IndicatorGroup = styled.View`
  width: 100%;
`;

export const LabelSpacer = styled.View`
  height: ${verticalScale(16)}px;
`;

export const IndicatorIconBox = styled.View`
  height: ${verticalScale(48)}px;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

export const InputColumn = styled.View`
  flex: 1;
  gap: ${verticalScale(16)}px;
`;

export const InputGroup = styled.View``;

export const InputLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: ${verticalScale(6)}px;
  margin-left: ${scale(4)}px;
`;

export const LocationBox = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(16)}px;
  padding-vertical: ${verticalScale(14)}px;
  padding-horizontal: ${scale(16)}px;
  min-height: ${verticalScale(48)}px;
  justify-content: center;
`;

export const LocationValueText = styled.Text<{ hasValue?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme, hasValue }) =>
    hasValue
      ? theme.colors.on_surface
      : `${theme.colors.on_surface_variant}80`};
`;

export const GridContainer = styled.View`
  flex-direction: row;
  gap: ${scale(12)}px;
  margin-bottom: ${verticalScale(20)}px;
`;

export const GridItem = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
`;

export const GridLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const GridValueRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const GridValueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;



export const SearchButton = styled.TouchableOpacity`
  width: 100%;
`;

export const SearchGradient = styled(LinearGradient)`
  width: 100%;
  height: ${verticalScale(52)}px;
  border-radius: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(12)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.15;
  shadow-radius: 20px;
  elevation: 6;
`;

export const SearchText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;
