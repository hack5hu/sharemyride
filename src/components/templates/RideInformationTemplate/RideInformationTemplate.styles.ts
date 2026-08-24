import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { ActivityIndicator as RNActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const ActivityIndicator = styled(RNActivityIndicator)``;

// ── Root Layout ──────────────────────────────────────────────────────────────

export {
  RideDetailsRoot as Root,
  RideDetailsReportButton as ReportButton,
  RideDetailsScrollContent as ScrollContent,
  RideDetailsContentPadding as ContentPadding,
  RideDetailsSectionCard as SectionCard,
  RideDetailsSectionLabelRow as SectionLabelRow,
  RideDetailsTimelineLabelRow as TimelineLabelRow,
  RideDetailsSectionDot as SectionDot,
  RideDetailsChipsWrap as ChipsWrap,
  RideDetailsPreferenceChip as PreferenceChip,
  RideDetailsFixedFooter as FixedFooter,
  RideDetailsViewMapButton as ViewMapButton,
} from '@/styles/RideDetailsStyles';

// ── Driver Card (flat, simple) ──────────────────────────────────────────────

export const DriverCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px ${moderateScale(18)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 16px;
  elevation: 3;
`;

export const DriverInfoGroup = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  flex: 1;
`;

export const DriverTextGroup = styled.View`
  gap: ${verticalScale(4)}px;
  flex: 1;
`;

export const DriverNameRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const DriverMetaRow = styled.View`
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

export const VerifiedPill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(3)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  padding-horizontal: ${scale(6)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const VerifiedRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const AvatarWrapper = styled.View`
  position: relative;
`;

export const BadgePin = styled.View`
  position: absolute;
  bottom: -2px;
  right: -2px;
`;

export const ChatButton = styled.TouchableOpacity`
  width: ${moderateScale(42)}px;
  height: ${moderateScale(42)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}14`};
  align-items: center;
  justify-content: center;
  margin-left: ${scale(8)}px;
`;

export const DriverActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const RatedBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  background-color: ${({ theme }) => `${theme.colors.on_surface_variant}12`};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(12)}px;
`;

// ── Stats Strip ───────────────────────────────────────────────────────────────

export const StatsStrip = styled.View`
  flex-direction: row;
  gap: ${scale(10)}px;
`;

export const StatPill = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding-vertical: ${verticalScale(12)}px;
  align-items: center;
  gap: ${verticalScale(4)}px;
  elevation: 1;
`;

export const StatPillIcon = styled.View`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(10)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}18`};
  align-items: center;
  justify-content: center;
`;



// ── Co-Riders ────────────────────────────────────────────────────────────────

export const CoRidersRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const AvatarStack = styled.View`
  flex-direction: row;
`;

export const CoRiderAvatar = styled.Image<{ offset: number }>`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  border-width: 2.5px;
  border-color: ${({ theme }) => theme.colors.surface_container_lowest};
  margin-left: ${({ offset }) => (offset > 0 ? -moderateScale(12) : 0)}px;
`;

export const CoRiderPlaceholder = styled.View<{ offset: number }>`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  border-width: 2.5px;
  border-color: ${({ theme }) => theme.colors.surface_container_lowest};
  margin-left: ${({ offset }) => (offset > 0 ? -moderateScale(12) : 0)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}20`};
  align-items: center;
  justify-content: center;
`;

export const EmptySeatPill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  border-radius: ${moderateScale(12)}px;
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
`;



// ── Fare Card ────────────────────────────────────────────────────────────────

export const FareCard = styled(LinearGradient)`
  border-radius: ${moderateScale(28)}px;
  padding: ${moderateScale(24)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FareLabel = styled.View`
  gap: ${verticalScale(4)}px;
`;

export const FarePriceBig = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(40)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  letter-spacing: -1.5px;
`;

export const PerSeatNote = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_primary}CC;
`;

export const FareIconBox = styled.View`
  width: ${moderateScale(64)}px;
  height: ${moderateScale(64)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: rgba(255, 255, 255, 0.18);
  align-items: center;
  justify-content: center;
`;

export const FareSummaryRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const FareSummaryItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  flex: 1;
`;

export const FareSummaryText = styled.View`
  flex-direction: column;
  gap: ${verticalScale(2)}px;
`;

export const FareDivider = styled.View`
  width: 1px;
  height: ${verticalScale(24)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant};
  margin-horizontal: ${scale(8)}px;
`;
