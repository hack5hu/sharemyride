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
} from '@/styles/RideDetailsStyles';

// ── Driver Card (flat, simple) ──────────────────────────────────────────────

export const DriverCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(14)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  elevation: 1;
`;

export const DriverInfoGroup = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${scale(14)}px;
  flex: 1;
`;

export const DriverTextGroup = styled.View`
  gap: ${verticalScale(2)}px;
  flex: 1;
`;

export const VerifiedRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  margin-top: ${verticalScale(2)}px;
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
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  align-items: center;
  justify-content: center;
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

// ── Section Card ──────────────────────────────────────────────────────────────

export {
  RideDetailsSectionCard as SectionCard,
  RideDetailsSectionLabelRow as SectionLabelRow,
  RideDetailsSectionDot as SectionDot,
} from '@/styles/RideDetailsStyles';

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

// ── Preferences (formerly Ride Rules) ────────────────────────────────────────

export {
  RideDetailsChipsWrap as ChipsWrap,
  RideDetailsPreferenceChip as PreferenceChip,
} from '@/styles/RideDetailsStyles';

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

// ── Fixed Footer ──────────────────────────────────────────────────────────────

export {
  RideDetailsFixedFooter as FixedFooter,
} from '@/styles/RideDetailsStyles';


