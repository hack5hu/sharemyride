import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import { Typography } from '@/components/atoms/Typography';



export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: verticalScale(100),
  },
})``;

export const ProfileHero = styled(Box)`
  align-items: center;
  margin-vertical: ${verticalScale(30)}px;
`;

export const AvatarWrapper = styled(Box)`
  position: relative;
`;

export const StatsRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  margin-top: ${verticalScale(8)}px;
  gap: ${scale(8)}px;
`;

export const VerifiedTag = styled(Box)`
  background-color: ${({ theme }) => theme.colors.primary_fixed};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(100)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const RatingBadge = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding-horizontal: ${scale(12)}px;
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
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(10)}px;
  border-radius: ${moderateScale(100)}px;
  margin-top: ${verticalScale(16)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;

export const Section = styled(Box)`
  padding-horizontal: ${scale(24)}px;
  margin-bottom: ${verticalScale(24)}px;
`;

export const PreferencesContainer = styled(Box)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${scale(8)}px;
`;

export const PreferenceTag = styled(Box)`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  gap: ${scale(8)}px;
`;

export const BentoCard = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

export const BentoHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const VehicleInfo = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const VehicleIconContainer = styled(Box)`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  background-color: ${({ theme }) => theme.colors.primary_fixed_dim};
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
`;

export const VehicleDetails = styled(Box)`
  flex: 1;
`;

export const TagRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  margin-top: ${verticalScale(4)}px;
`;

export const StatusDot = styled(Box)`
  width: ${moderateScale(6)}px;
  height: ${moderateScale(6)}px;
  border-radius: ${moderateScale(3)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-right: ${scale(4)}px;
`;

export const RatingsBreakdown = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.secondary_container}33;
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
`;


export const ReviewerAvatar = styled.Image`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(16)}px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.surface};
  margin-right: ${scale(-10)}px;
`;

export const ReviewCard = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const ReviewHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${verticalScale(12)}px;
`;

export const ReviewerInfo = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const StarsRow = styled(Box)`
  flex-direction: row;
  gap: ${scale(2)}px;
`;

export const ReportButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(16)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.outline_variant}33;
  gap: ${scale(8)}px;
`;


export const HeroName = styled(Typography).attrs({
  variant: 'headline',
  size: 'lg',
  weight: 'bold',
})`
  margin-top: ${verticalScale(16)}px;
`;

export const SectionTitleLabel = styled(Typography).attrs({
  variant: 'label',
  size: 'sm',
  weight: 'bold',
  color: 'outline',
})`
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const ReviewComment = styled(Typography).attrs({
  variant: 'body',
  size: 'sm',
  weight: 'medium',
  color: 'on_surface_variant',
})`
  font-style: italic;
  line-height: ${responsiveFont(20)}px;
`;

export const RatingsBreakdownText = styled(Typography).attrs({
  variant: 'label',
  size: 'md',
  weight: 'bold',
  color: 'on_secondary_container',
})<{ $hasAvatars: boolean }>`
  margin-left: ${({ $hasAvatars }) => ($hasAvatars ? scale(12) : 0)}px;
`;
