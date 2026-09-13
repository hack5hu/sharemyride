import LinearGradient from 'react-native-linear-gradient';
import styled, { type DefaultTheme } from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const MainContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(120),
  },
  keyboardShouldPersistTaps: 'handled',
})`
  flex: 1;
`;

export const HeaderSection = styled.View`
  margin-bottom: ${verticalScale(20)}px;
`;

export const HeroBadge = styled.View`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}18`};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(5)}px;
  border-radius: 9999px;
  margin-bottom: ${verticalScale(10)}px;
`;

export const HeroBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.2px;
`;

export const TitleContainer = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(30)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  line-height: ${verticalScale(38)}px;
  letter-spacing: -0.5px;
`;

export const TitleHighlight = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Subtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13.5)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(6)}px;
  line-height: ${verticalScale(20)}px;
`;

export const ContinueButtonSection = styled.View`
  margin-top: ${verticalScale(20)}px;
`;

export const ContinueGradient = styled(LinearGradient).attrs(
  ({ theme, $disabled }: { theme: DefaultTheme; $disabled?: boolean }) => ({
    colors: $disabled
      ? [theme.colors.surface_variant, theme.colors.surface_variant]
      : [theme.colors.primary, theme.colors.primary_container],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  }),
)<{ $disabled?: boolean }>`
  border-radius: ${moderateScale(16)}px;
  elevation: ${({ $disabled }) => ($disabled ? 0 : 4)};
  shadow-color: ${({ theme, $disabled }) =>
    $disabled ? 'transparent' : theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 8px;
`;

export const ContinueButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(16)}px;
  padding-horizontal: ${scale(24)}px;
`;

export const ContinueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15.5)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  margin-right: ${scale(8)}px;
`;

export const RecentRidesSection = styled.View`
  margin-top: ${verticalScale(28)}px;
`;

export const RecentRidesHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(12)}px;
`;

export const RecentRidesTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(17)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.3px;
`;

export const RecentRideCard = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  border-width: 1px;
  border-color: ${({ theme }) =>
    theme.colors.outline_variant || 'rgba(0, 0, 0, 0.06)'};
  padding: ${moderateScale(14)}px ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(10)}px;
  shadow-color: rgb(0, 0, 0);
  shadow-offset: 0px 2px;
  shadow-opacity: 0.04;
  shadow-radius: 6px;
  elevation: 2;
`;

export const RecentRideLeft = styled.View`
  flex: 1;
  gap: ${verticalScale(6)}px;
`;

export const RecentRideRouteRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const RecentRideLocationText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(13.5)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  max-width: ${scale(120)}px;
`;

export const RecentRideMetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: ${scale(8)}px;
`;

export const RecentRideTag = styled.View<{ $isLocal?: boolean }>`
  background-color: ${({ theme, $isLocal }) =>
    $isLocal ? `${theme.colors.primary}15` : `${theme.colors.tertiary}15`};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: 9999px;
`;

export const RecentRideTagText = styled.Text<{ $isLocal?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme, $isLocal }) =>
    $isLocal ? theme.colors.primary : theme.colors.tertiary};
`;

export const RecentRideSubText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const RecentRideActionBox = styled.View`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  align-items: center;
  justify-content: center;
  margin-left: ${scale(8)}px;
`;
