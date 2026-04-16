import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const TitleSection = styled.View`
  margin-bottom: ${verticalScale(24)}px;
`;

export const PageTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(24)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
  margin-bottom: ${verticalScale(6)}px;
`;

export const PageSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(20)}px;
`;

export const SegmentRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(16)}px;
`;

export const SegmentRowLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(14)}px;
`;

export const SegmentIconBox = styled.View`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  align-items: center;
  justify-content: center;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 1px;
  shadow-opacity: 0.06;
  shadow-radius: 2px;
  elevation: 1;
`;

export const SegmentRowTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const SegmentRowSub = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

export const TierCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(28)}px ${scale(20)}px;
  align-items: center;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 8px;
  shadow-opacity: 0.05;
  shadow-radius: 20px;
  elevation: 3;
`;

export const TierLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.outline};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const TierPriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  margin-top: ${verticalScale(8)}px;
  margin-bottom: ${verticalScale(24)}px;
`;

export const TierPriceText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(52)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -2px;
`;

export const TierBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding: ${verticalScale(4)}px ${scale(10)}px;
  border-radius: 9999px;
`;

export const TierBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.on_primary_container};
  text-transform: uppercase;
`;

export const TierToggleRow = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.surface_container};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(6)}px;
  width: 100%;
`;

export const TierToggleItem = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding-vertical: ${verticalScale(10)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ active, theme }) => active ? theme.colors.surface : 'transparent'};
  border-radius: ${moderateScale(8)}px;
  ${({ active }) => active && 'shadow-color: rgba(0,0,0,0.1); shadow-offset: 0px 2px; shadow-opacity: 0.1; shadow-radius: 4px; elevation: 2;'}
`;

export const TierToggleText = styled.Text<{ active: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  font-weight: ${({ active }) => active ? '700' : '600'};
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.outline};
`;

export const SegmentTextStack = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const FloatingFooter = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(32)}px;
`;

export const FooterGradient = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: -${verticalScale(48)}px;
`;

export const ContinueButton = styled.TouchableOpacity`
  width: 100%;
`;

export const ContinueGradient = styled(LinearGradient)`
  width: 100%;
  height: ${moderateScale(56)}px;
  border-radius: ${moderateScale(12)}px;
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

export const ContinueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  letter-spacing: 0.3px;
`;
