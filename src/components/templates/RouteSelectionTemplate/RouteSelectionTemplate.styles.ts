import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import { Dimensions } from 'react-native';
import { OlaMap } from '@/components/organisms/OlaMap';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

export const Root = styled.View`
  flex: 1;
`;

export const StyledOlaMap = styled(OlaMap)`
  flex: 1;
`;

export const StyledLinearGradient = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${moderateScale(40)}px;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
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
  },
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const RouteWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(24)}px;
  padding-bottom: ${verticalScale(8)}px;
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
  shadow-color: rgb(0, 0, 0);
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
  shadow-color: rgb(0, 0, 0);
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
  background-color: ${({ theme }) =>
    `${theme.colors.primary_fixed}4D`}; /* 30% opacity */
  border-radius: ${moderateScale(16)}px;
  border-width: 1px;
  border-color: ${({ theme }) =>
    `${theme.colors.primary_fixed_dim}33`}; /* 20% opacity */
`;

export const TrustBadgeText = styled.Text`
  flex: 1;
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_primary_fixed_variant};
  line-height: ${responsiveFont(16)}px;
`;

/* Footer */
export const FixedFooter = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(8)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  elevation: 8;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  z-index: 50;
`;

export const LoaderIndicator = styled.ActivityIndicator`
  margin-vertical: ${moderateScale(40)}px;
`;
