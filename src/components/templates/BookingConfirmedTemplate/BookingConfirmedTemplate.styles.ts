import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { Typography } from '@/components/atoms/Typography';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const MainContent = styled.ScrollView`
  flex: 1;
  padding-horizontal: ${scale(20)}px;
`;

export const SuccessArea = styled.View`
  align-items: center;
  margin-top: ${verticalScale(20)}px;
  margin-bottom: ${verticalScale(28)}px;
`;

export const SuccessGlowRing = styled.View`
  width: ${moderateScale(104)}px;
  height: ${moderateScale(104)}px;
  border-radius: ${moderateScale(52)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(20)}px;
`;

export const SuccessIconContainer = styled(LinearGradient)`
  width: ${moderateScale(80)}px;
  height: ${moderateScale(80)}px;
  border-radius: ${moderateScale(40)}px;
  align-items: center;
  justify-content: center;
  elevation: 6;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.35;
  shadow-radius: 12px;
`;

export const SuccessTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(26)}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(6)}px;
  letter-spacing: -0.5px;
  text-align: center;
`;

export const SuccessSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(15)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-align: center;
`;

export const RideSummaryGrid = styled.View`
  width: 100%;
  gap: ${verticalScale(16)}px;
  margin-bottom: ${verticalScale(32)}px;
`;

export const DriverCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(18)}px ${moderateScale(20)}px;
  flex-direction: row;
  align-items: center;
  elevation: 3;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 16px;
`;

export const AvatarWrapper = styled.View`
  position: relative;
`;

export const BadgePin = styled.View`
  position: absolute;
  bottom: -2px;
  right: -2px;
`;

export const DriverMeta = styled.View`
  flex: 1;
  margin-left: ${scale(14)}px;
  gap: ${verticalScale(4)}px;
`;

export const DriverNameText = styled(Typography)``;

export const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  flex-wrap: wrap;
`;

export const RatingPill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(3)}px;
  background-color: ${({ theme }) => `${theme.colors.warning || '#f59e0b'}18`};
  padding-horizontal: ${scale(6)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const MetaBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding-horizontal: ${scale(6)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: ${scale(14)}px;
`;

export const DetailCard = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  justify-content: space-between;
  elevation: 3;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 16px;
`;

export const DetailCardHeader = styled.View`
  gap: ${verticalScale(8)}px;
`;

export const IconBox = styled.View`
  width: ${moderateScale(38)}px;
  height: ${moderateScale(38)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}14`};
  align-items: center;
  justify-content: center;
`;

export const ValueWrapper = styled.View`
  margin-top: ${verticalScale(10)}px;
  gap: ${verticalScale(2)}px;
`;

export const SafetyBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px ${moderateScale(18)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(14)}px;
  elevation: 3;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 16px;
`;

export const SafetyIconBox = styled.View`
  width: ${moderateScale(44)}px;
  height: ${moderateScale(44)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  align-items: center;
  justify-content: center;
`;

export const SafetyMeta = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const SafetySubtitleText = styled(Typography)``;

export const ActionArea = styled.View`
  padding-bottom: ${verticalScale(40)}px;
  gap: ${verticalScale(12)}px;
`;
