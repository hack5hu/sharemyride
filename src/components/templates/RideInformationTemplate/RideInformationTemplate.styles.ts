import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

// ── Root Layout ──────────────────────────────────────────────────────────────

export const Root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
`;

export const ContentPadding = styled.View`
  padding-horizontal: ${scale(20)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(140)}px;
  gap: ${verticalScale(16)}px;
`;

// ── Driver Card (flat, simple) ──────────────────────────────────────────────

export const DriverCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
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

export const SectionCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(28)}px;
  padding: ${moderateScale(20)}px;
  elevation: 1;
`;

export const SectionLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const SectionDot = styled.View<{ color?: string }>`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ theme, color }) => color || theme.colors.primary};
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

// ── Preferences (formerly Ride Rules) ────────────────────────────────────────

export const ChipsWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8)}px;
`;

export const PreferenceChip = styled.View<{ accent?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme, accent }) =>
    accent ? `${theme.colors.primary}18` : theme.colors.surface_container_low};
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

// ── Fixed Footer ──────────────────────────────────────────────────────────────

export const FixedFooter = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-horizontal: ${scale(20)}px;
  padding-bottom: ${verticalScale(36)}px;
  padding-top: ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const BookButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${moderateScale(18)}px;
  padding-vertical: ${verticalScale(18)}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: ${scale(10)}px;
  elevation: 12;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.35;
  shadow-radius: 16px;
`;

export const AmenityRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;
