import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const TopHeader = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: ${({ theme }) => theme.colors.surface};
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => `${theme.colors.outline_variant}26`}; /* 15% opacity */
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
  border-radius: 9999px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.5px;
`;

export const StepIndicator = styled.View`
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  background-color: ${({ theme }) => theme.colors.primary_fixed};
  border-radius: 9999px;
`;

export const StepText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.on_primary_fixed_variant};
`;

/* Map Canvas Elements */
export const MapSection = styled.View`
  height: ${verticalScale(300)}px;
  width: ${width}px;
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface_container};
`;

export const MapImageWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
  /* React Native doesn't perfectly support mix-blend-mode without extras, opacity + background color typically solves it */
`;

/* Route Content Area */
export const ContentLayer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: verticalScale(120), 
  }
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const RouteWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(24)}px;
  padding-bottom: ${verticalScale(32)}px;
  min-height: 100%;
`;

export const ContentHeader = styled.View`
  margin-bottom: ${verticalScale(24)}px;
`;

export const ContentTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(20)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(4)}px;
  letter-spacing: -0.5px;
`;

export const SelectedRouteBadge = styled.View`
  align-self: flex-start;
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  background-color: ${({ theme }) => theme.colors.primary_container};
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const SelectedRouteText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_primary_container};
`;

export const ContentSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(20)}px;
`;

/* Static Map Elements Overlays */
export const SourcePin = styled.View`
  position: absolute;
  top: 25%;
  left: 25%;
  transform: translateX(-12px) translateY(-12px);
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${moderateScale(4)}px;
  border-radius: 9999px;
  border-width: 4px;
  border-color: white;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 5;
`;

export const SourceInner = styled.View`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  background-color: white;
  border-radius: 9999px;
`;

export const DestinationPin = styled.View`
  position: absolute;
  bottom: 25%;
  right: 25%;
  transform: translateX(12px) translateY(12px);
  background-color: ${({ theme }) => theme.colors.tertiary};
  padding: ${moderateScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 5;
  align-items: center;
  justify-content: center;
`;

/* Trust Badge */
export const TrustBadge = styled.View`
  margin-top: ${verticalScale(32)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme }) => `${theme.colors.primary_fixed}4D`}; /* 30% opacity */
  border-radius: ${moderateScale(16)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.primary_fixed_dim}33`}; /* 20% opacity */
`;

export const TrustBadgeText = styled.Text`
  flex: 1;
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_primary_fixed_variant};
  line-height: ${responsiveFont(16)}px;
`;

/* Footer */
export const FooterGradient = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(24)}px;
  padding-top: ${verticalScale(32)}px;
  z-index: 50;
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
  shadow-radius: 32px;
  elevation: 8;
`;

export const ContinueButton = styled.TouchableOpacity`
  width: 100%;
`;

export const ContinueButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;
