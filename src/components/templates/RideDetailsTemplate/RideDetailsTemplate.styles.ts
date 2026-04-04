import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles/scale';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: verticalScale(40),
  }
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MainContent = styled.View`
  padding-horizontal: ${scale(24)}px;
  margin-top: ${verticalScale(24)}px;
`;

export const MapPlaceholder = styled.View`
  height: ${verticalScale(192)}px;
  border-radius: ${moderateScale(32)}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface_container};
  margin-bottom: ${verticalScale(24)}px;
`;

export const MapImage = styled.Image`
  width: 100%;
  height: 100%;
  opacity: 0.8;
`;

export const LiveTrackingBadge = styled.View`
  position: absolute;
  bottom: ${verticalScale(16)}px;
  left: ${scale(24)}px;
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}E6`}; /* 90% opacity */
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(24)}px;
  flex-direction: row;
  align-items: center;
  shadow-color: black;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;

export const LiveTrackingText = styled.Text`
  font-family: 'PlusJakartaSans-ExtraBold';
  font-size: ${responsiveFont(10)}px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.primary};
  margin-left: ${scale(6)}px;
`;

export const RouteGrid = styled.View`
  margin-bottom: ${verticalScale(24)}px;
`;

export const MetaRow = styled.View`
  flex-direction: row;
  gap: ${scale(12)}px;
  margin-bottom: ${verticalScale(24)}px;
`;

export const ETAWrapper = styled.View`
  flex: 1;
`;

export const SectionSpacer = styled.View`
  height: ${verticalScale(24)}px;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => `${theme.colors.surface_container_highest}80`}; /* 50% opacity */
  padding: ${moderateScale(20)}px;
  border-radius: ${moderateScale(24)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${verticalScale(32)}px;
`;

export const CancelText = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.error};
  margin-left: ${scale(8)}px;
`;
