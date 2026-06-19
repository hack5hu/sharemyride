import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const MainContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${scale(32)}px;
`;

export const SuccessIconWrapper = styled.View`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(100)}px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(32)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 10px;
  shadow-opacity: 0.3;
  shadow-radius: 20px;
  elevation: 10;
`;

export const Title = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(32)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  text-align: center;
  letter-spacing: -1px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const Subtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-align: center;
  line-height: ${responsiveFont(24)}px;
`;

export const InfoCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(24)}px;
  width: 100%;
  margin-top: ${verticalScale(48)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.on_surface}08`};
`;

export const InfoHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const InfoTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const InfoText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(22)}px;
`;

export const ActionArea = styled.View`
  width: 100%;
  padding-horizontal: ${scale(32)}px;
  padding-bottom: ${verticalScale(40)}px;
  gap: ${verticalScale(12)}px;
`;

export const PrimaryButton = styled.TouchableOpacity`
  width: 100%;
`;

export const PrimaryGradient = styled(LinearGradient)`
  width: 100%;
  height: ${moderateScale(58)}px;
  border-radius: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.25;
  shadow-radius: 24px;
  elevation: 8;
`;

export const PrimaryButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const SecondaryButton = styled.TouchableOpacity`
  width: 100%;
  height: ${moderateScale(54)}px;
  align-items: center;
  justify-content: center;
`;

export const SecondaryButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.primary};
`;
