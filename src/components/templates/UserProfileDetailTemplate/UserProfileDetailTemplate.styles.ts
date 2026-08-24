import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: verticalScale(60),
  },
})``;

export const ContentPadding = styled.View`
  padding-horizontal: ${scale(20)}px;
  gap: ${verticalScale(16)}px;
  margin-top: ${verticalScale(12)}px;
`;

export const ProfileHeroCard = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(24)}px;
  padding: ${verticalScale(24)}px ${scale(20)}px;
  elevation: 3;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
`;

export const AvatarWrapper = styled.View`
  position: relative;
`;

export const BadgePin = styled.View`
  position: absolute;
  bottom: 2px;
  right: 2px;
`;

export const HeroName = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(22)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-top: ${verticalScale(12)}px;
  text-align: center;
`;

export const BioContainer = styled.View`
  margin-top: ${verticalScale(10)}px;
  padding-horizontal: ${scale(14)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  align-self: stretch;
  align-items: center;
`;

export const StatsRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${verticalScale(8)}px;
  gap: ${scale(8)}px;
`;

export const VerifiedTag = styled.View`
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(100)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const RatingBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(100)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const ChatButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${scale(28)}px;
  padding-vertical: ${verticalScale(12)}px;
  border-radius: ${moderateScale(100)}px;
  margin-top: ${verticalScale(16)}px;
  elevation: 3;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 8px;
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

export const ReviewItem = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(14)}px;
  border-radius: ${moderateScale(14)}px;
  gap: ${verticalScale(8)}px;
`;

export const ReviewHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewerMeta = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(10)}px;
`;

export const StarsRow = styled.View`
  flex-direction: row;
  gap: ${scale(2)}px;
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
