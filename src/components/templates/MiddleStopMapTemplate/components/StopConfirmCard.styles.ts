import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const BottomCard = styled.View<{ $paddingBottom?: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding: ${moderateScale(16)}px ${scale(24)}px;
  padding-bottom: ${({ $paddingBottom }) => $paddingBottom ?? verticalScale(32)}px;
`;

export const BottomGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: ['transparent', `${theme.colors.surface}E6`, theme.colors.surface],
  locations: [0, 0.3, 1],
}))`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
`;

export const StopInfoCard = styled.View`
  background-color: ${({ theme }) =>
    `${theme.colors.surface_container_lowest}F2`};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(12)}px;
  shadow-color: rgb(0, 0, 0);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 4;
`;

export const StopInfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StopInfoLeft = styled.View`
  flex: 1;
  margin-right: ${scale(12)}px;
`;

export const StopNameText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(2)}px;
`;

export const StopAddressText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const DistancePill = styled.View<{ $isWarning?: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, $isWarning }) =>
    $isWarning ? `${theme.colors.error}1A` : `${theme.colors.primary}1A`};
  padding: ${verticalScale(4)}px ${scale(10)}px;
  border-radius: 9999px;
  gap: ${scale(4)}px;
`;

export const DistancePillText = styled.Text<{ $isWarning?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme, $isWarning }) =>
    $isWarning ? theme.colors.error : theme.colors.primary};
`;
