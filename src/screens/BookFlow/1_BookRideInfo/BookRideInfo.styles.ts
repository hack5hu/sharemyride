import styled from 'styled-components/native';
import { View } from 'react-native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: verticalScale(100),
  },
})`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(16)}px;
  background-color: ${({ theme }) => `${theme.colors.surface}CC`};
`;

export const HeaderTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(20)}px;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -1px;
`;

/* Hero Section */
export const HeroSection = styled.View`
  padding-horizontal: ${scale(24)}px;
  margin-bottom: ${verticalScale(32)}px;
`;

export const HeroTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(32)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -1px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const HeroSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

/* Booking Card */
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
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(12)}px;
`;

export const IndicatorLine = styled.View`
  width: 2px;
  flex: 1;
  background-color: ${({ theme }) => `${theme.colors.outline_variant}40`};
  margin-vertical: ${verticalScale(4)}px;
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
  color: ${({ theme, hasValue }) => hasValue ? theme.colors.on_surface : `${theme.colors.on_surface_variant}80`};
`;

/* Grid Details */
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

/* Stepper Section */
export const StepperContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(24)}px;
`;

export const StepperLabelGroup = styled.View``;

export const StepperLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const StepperSub = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => `${theme.colors.on_surface_variant}B3`};
  margin-top: ${verticalScale(2)}px;
`;

export const StepperControls = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(6)}px;
  border-radius: ${moderateScale(12)}px;
  gap: ${scale(12)}px;
`;

export const StepperButton = styled.TouchableOpacity<{ primary?: boolean }>`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ theme, primary }) => primary ? theme.colors.primary : theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

export const StepperValue = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  min-width: ${scale(24)}px;
  text-align: center;
`;

/* CTA Button */
export const SearchButton = styled.TouchableOpacity`
  width: 100%;
`;

export const SearchGradient = styled(LinearGradient)`
  width: 100%;
  height: ${verticalScale(64)}px;
  border-radius: ${moderateScale(20)}px;
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

/* Recent Searches */
export const SectionContainer = styled.View`
  padding-horizontal: ${scale(24)}px;
  margin-top: ${verticalScale(40)}px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(20)}px;
`;

export const SectionTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(20)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
`;

export const ClearButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const RecentItem = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(12)}px;
`;

export const RecentLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const RecentIconBox = styled.View<{ colorType?: 'primary' | 'tertiary' | 'secondary' }>`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: ${moderateScale(24)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  align-items: center;
  justify-content: center;
`;

export const RecentContent = styled.View``;

export const RecentTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const RecentSub = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;

/* Trust Section */
export const TrustBanner = styled.View`
  margin-horizontal: ${scale(24)}px;
  margin-top: ${verticalScale(40)}px;
  background-color: ${({ theme }) => `${theme.colors.secondary_container}20`};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(24)}px;
  flex-direction: row;
  gap: ${scale(16)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.secondary_container}30`};
`;

export const TrustIconWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding: ${moderateScale(8)}px;
  border-radius: ${moderateScale(10)}px;
`;

export const TrustContent = styled.View`
  flex: 1;
`;

export const TrustTitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_secondary_container};
  margin-bottom: ${verticalScale(4)}px;
`;

export const TrustDescText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => `${theme.colors.on_secondary_container}CC`};
  line-height: ${responsiveFont(20)}px;
`;

export const BottomNav = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${verticalScale(80)}px;
  background-color: ${({ theme }) => `${theme.colors.surface}B3`};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: ${verticalScale(20)}px;
  border-top-left-radius: ${moderateScale(32)}px;
  border-top-right-radius: ${moderateScale(32)}px;
`;

export const NavItem = styled.TouchableOpacity<{ active?: boolean }>`
  align-items: center;
  justify-content: center;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(8)}px;
  background-color: ${({ theme, active }) => active ? theme.colors.surface_container_high : 'transparent'};
  border-radius: ${moderateScale(16)}px;
`;

export const NavText = styled.Text<{ active?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  font-weight: 600;
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;
