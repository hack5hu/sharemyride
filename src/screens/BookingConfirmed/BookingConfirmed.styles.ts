import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Header = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 50;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${verticalScale(48)}px ${scale(24)}px ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface}CC;
  
`;

export const BrandTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(18)}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary_container};
  letter-spacing: -0.5px;
`;

export const MainContent = styled.ScrollView`
  flex: 1;
  padding-top: ${verticalScale(50)}px;
  padding-horizontal: ${scale(24)}px;
`;

export const SuccessArea = styled.View`
  align-items: center;
  margin-top: ${verticalScale(32)}px;
  margin-bottom: ${verticalScale(40)}px;
`;

export const SuccessIconContainer = styled(LinearGradient)`
  width: ${moderateScale(96)}px;
  height: ${moderateScale(96)}px;
  border-radius: ${moderateScale(48)}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(24)}px;
  elevation: 8;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
`;

export const SuccessTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(28)}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(8)}px;
  letter-spacing: -0.5px;
`;

export const SuccessSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(16)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-align: center;
`;

export const RideSummaryGrid = styled.View`
  width: 100%;
  gap: ${verticalScale(16)}px;
  margin-bottom: ${verticalScale(48)}px;
`;

export const DriverCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(24)}px;
  flex-direction: row;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 20px;
`;

export const DriverMeta = styled.View`
  flex: 1;
  margin-left: ${scale(16)}px;
`;

export const DriverBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_fixed};
  padding: ${verticalScale(2)}px ${scale(8)}px;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  margin-bottom: ${verticalScale(4)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: ${scale(16)}px;
`;

export const DetailCard = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface_container};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(20)}px;
  justify-content: space-between;
`;

export const IconBox = styled.View`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(10)}px;
  background-color: ${({ theme }) => theme.colors.primary_container}1A;
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const SafetyBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary_container}26;
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const ActionArea = styled.View`
  padding-bottom: ${verticalScale(48)}px;
  gap: ${verticalScale(12)}px;
`;

export const PrimaryButton = styled(LinearGradient)`
  width: 100%;
  padding-vertical: ${verticalScale(18)}px;
  border-radius: ${moderateScale(16)}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: ${scale(8)}px;
  elevation: 4;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
`;

export const SecondaryButton = styled.TouchableOpacity`
  width: 100%;
  padding-vertical: ${verticalScale(16)}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: ${scale(8)}px;
`;
