import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '@/components/atoms/Typography';

export const ContentScroll = styled.ScrollView`
  flex: 1;
`;

export const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const DriverMeta = styled.View`
  align-items: flex-end;
`;

export const BriefingCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(20)}px;
  margin-horizontal: ${scale(24)}px;
  margin-top: ${verticalScale(12)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 20px;
`;

export const IconCircle = styled.View`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  background-color: ${({ theme }) => theme.colors.primary_container}1A;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
`;

export const ContinueButton = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const ContinueGradient = styled(LinearGradient)`
  width: 100%;
  padding-vertical: ${verticalScale(18)}px;
  border-radius: ${moderateScale(16)}px;
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
  elevation: 8;
`;

export const ContinueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;
export const BarWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(40)}px;
  padding-top: ${verticalScale(24)}px;
  background-color: ${({ theme }) => theme.colors.surface}E6;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.surface_container_highest};
`;

export const TitleContainer = styled.View`
  padding-horizontal: ${scale(24)}px;
  margin-top: ${verticalScale(12)}px;
  margin-bottom: ${verticalScale(8)}px;
  gap: ${verticalScale(4)}px;
`;

export const VehicleListWrapper = styled.View`
  margin-top: ${verticalScale(16)}px;
`;

export const LegendWrapper = styled.View`
  margin-top: ${verticalScale(16)}px;
`;

export const FloorPlanWrapper = styled.View`
  margin-top: ${verticalScale(16)}px;
`;

export const EmptyStateContainer = styled.View`
  margin-top: ${verticalScale(32)}px;
  align-items: center;
  justify-content: center;
  padding: ${scale(24)}px;
`;

export const EmptyStateText = styled(Typography as any)`
  text-align: center;
`;