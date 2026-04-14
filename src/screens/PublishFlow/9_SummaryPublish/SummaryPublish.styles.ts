import styled from 'styled-components/native';
import { View } from 'react-native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

/* DECORATIVE BACKGROUND BLOBS */
export const BackgroundContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

export const BlobTopLeft = styled.View`
  position: absolute;
  top: -10%;
  left: -20%;
  width: ${scale(250)}px;
  height: ${scale(250)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => `${theme.colors.primary_container}20`};
`;

export const BlobBottomRight = styled.View`
  position: absolute;
  bottom: 10%;
  right: -20%;
  width: ${scale(300)}px;
  height: ${scale(300)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => `${theme.colors.secondary_container}30`};
`;


export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(14)}px;
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const SaveButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
`;

export const SaveText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(140),
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  margin-top: ${verticalScale(16)}px;
`;

export const TitleSection = styled.View`
  margin-bottom: ${verticalScale(24)}px;
`;

export const PageTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(28)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const PageSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(22)}px;
`;

/* CARDS */
export const GlassCard = styled.View`
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}99`};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(20)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.on_surface}1A`};
  margin-bottom: ${verticalScale(16)}px;
`;

/* ROUTE SUMMARY */
export const RouteHeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const RouteLayout = styled.View`
  flex-direction: row;
  gap: ${scale(12)}px;
  flex: 1;
`;

export const TimelineLine = styled.View`
  align-items: center;
  padding-top: ${verticalScale(4)}px;
`;

export const TimelineDotOutline = styled.View`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-width: 3px;
  border-color: ${({ theme }) => `${theme.colors.primary_container}4D`};
`;

export const TimelineTrack = styled(LinearGradient)`
  width: 2px;
  height: ${verticalScale(40)}px;
  margin-vertical: ${verticalScale(4)}px;
`;

export const TimelineDotEnd = styled.View`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  border-radius: 6px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.on_primary};
`;

export const RouteDetailsStack = styled.View`
  gap: ${verticalScale(24)}px;
  flex: 1;
`;

export const RouteStop = styled.View``;

export const StopLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  margin-bottom: ${verticalScale(2)}px;
`;

export const StopLocation = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const StopTime = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;

export const EditButton = styled.TouchableOpacity`
  padding: ${moderateScale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: 9999px;
`;

/* GRID ROW */
export const GridRow = styled.View`
  flex-direction: row;
  gap: ${scale(12)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const GridCard = styled.View`
  flex: 1;
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}99`};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.on_surface}1A`};
`;

export const GridCardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const GridCardLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${verticalScale(2)}px;
`;

export const GridCardValue = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const GridCardSub = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;

/* PREFERENCES */
export const PrefHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const PrefLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const BadgeRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${scale(8)}px;
`;

export const PrefBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: 9999px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.on_surface}10`};
`;

export const PrefBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

/* FLOATING FOOTER */
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

export const PublishButton = styled.TouchableOpacity`
  width: 100%;
`;

export const PublishGradient = styled(LinearGradient)`
  width: 100%;
  height: ${moderateScale(56)}px;
  border-radius: ${moderateScale(16)}px;
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.25;
  shadow-radius: 24px;
  elevation: 8;
`;

export const PublishText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const TermsText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-align: center;
  margin-top: ${verticalScale(16)}px;
`;

export const TermsLink = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration-line: underline;
  text-decoration-color: ${({ theme }) => theme.colors.primary_container};
`;
