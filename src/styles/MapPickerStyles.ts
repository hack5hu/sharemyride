import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const MapPickerContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface_container};
`;

export const MapPickerGradientOverlay = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [
    `${theme.colors.surface}E6`,
    'transparent',
    'transparent',
    `${theme.colors.surface}E6`,
  ],
  locations: [0, 0.2, 0.8, 1],
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const MapPickerPinContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 0;
  align-items: center;
  z-index: 10;
`;

export const MapPickerPinWrapper = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: center;
`;

export const MapPickerTooltipBubble = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${verticalScale(8)}px ${scale(16)}px;
  border-radius: 9999px;
  margin-bottom: ${verticalScale(16)}px;
  shadow-color: rgb(0, 0, 0);
  shadow-offset: 0px 10px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 8;
`;

export const MapPickerTooltipText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  letter-spacing: 1px;
`;

export const MapPickerPinShadow = styled.View`
  position: absolute;
  bottom: -4px;
  width: ${moderateScale(16)}px;
  height: ${verticalScale(4)}px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 9999px;
`;

export const MapPickerSelectButtonContainer = styled.View`
  margin-horizontal: ${scale(24)}px;
  margin-top: ${verticalScale(24)}px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const MapPickerLocationPreviewContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${verticalScale(12)}px ${scale(16)}px;
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(12)}px;
  flex-direction: row;
  align-items: center;
  shadow-color: rgb(0, 0, 0);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 3;
`;

export const MapPickerLocationPreviewTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  font-weight: 800;
  margin-bottom: ${verticalScale(2)}px;
`;

export const MapPickerLocationPreviewText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  font-weight: 500;
  flex: 1;
`;
