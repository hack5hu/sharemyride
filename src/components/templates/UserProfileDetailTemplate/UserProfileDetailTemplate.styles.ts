import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: verticalScale(60),
  },
})``;

export const ContentPadding = styled.View`
  padding-horizontal: ${scale(16)}px;
  gap: ${verticalScale(14)}px;
  margin-top: ${verticalScale(4)}px;
`;

export const ProfileHeroCard = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${verticalScale(20)}px ${scale(16)}px;
  elevation: 2;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
`;

export const AvatarWrapper = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const BadgePin = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

export const HeroName = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(20)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-top: ${verticalScale(10)}px;
  text-align: center;
`;

export const BioText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(13)}px;
  line-height: ${moderateScale(18)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(8)}px;
  text-align: center;
  padding-horizontal: ${scale(12)}px;
`;

export const StatsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: ${verticalScale(14)}px;
  gap: ${scale(8)}px;
`;

export const VerifiedTag = styled.View`
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(100)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const RatingBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(100)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const HeroActionsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(10)}px;
  margin-top: ${verticalScale(14)}px;
  flex-wrap: wrap;
`;

export const ActionPillButton = styled.TouchableOpacity<{
  variant?: 'primary' | 'secondary';
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme, variant }) =>
    variant === 'secondary'
      ? `${theme.colors.primary}15`
      : theme.colors.primary};
  padding-horizontal: ${scale(18)}px;
  padding-vertical: ${verticalScale(10)}px;
  border-radius: ${moderateScale(100)}px;
  elevation: ${({ variant }) => (variant === 'secondary' ? 0 : 2)};
`;

export const SectionCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(18)}px;
  elevation: 2;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.04;
  shadow-radius: 8px;
  gap: ${verticalScale(12)}px;
`;

export const SectionLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const SectionDot = styled.View<{ color?: string }>`
  width: ${moderateScale(6)}px;
  height: ${moderateScale(6)}px;
  border-radius: ${moderateScale(3)}px;
  background-color: ${({ theme, color }) => color || theme.colors.primary};
`;

export const PreferencesWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${scale(8)}px;
`;

export const PreferenceChip = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  gap: ${scale(6)}px;
`;

export const RatingsBreakdownCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(16)}px ${moderateScale(18)}px;
  border-radius: ${moderateScale(18)}px;
  elevation: 2;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.04;
  shadow-radius: 8px;
`;

export const ReviewerAvatar = styled.Image`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(16)}px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.surface_container_lowest};
  margin-right: ${scale(-10)}px;
`;

export const ReportButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(14)}px;
  background-color: ${({ theme }) => `${theme.colors.error}10`};
  border-radius: ${moderateScale(16)}px;
  gap: ${scale(8)}px;
`;
