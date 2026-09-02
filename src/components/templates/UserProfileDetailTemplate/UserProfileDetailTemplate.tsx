import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Loader } from '@/components/atoms/Loader';
import { Typography } from '@/components/atoms/Typography';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { moderateScale } from '@/styles';
import { ProfileHeroCard } from './components/ProfileHeroCard';
import { RecentReviewsList } from './components/RecentReviewsList';
import { VehicleBentoCard } from './components/VehicleBentoCard';
import { type UserProfileDetailTemplateProps } from './types';
import * as S from './UserProfileDetailTemplate.styles';

export const UserProfileDetailTemplate: React.FC<
  UserProfileDetailTemplateProps
> = React.memo(
  ({
    profile,
    isLoading,
    t,
    handleBack,
    handleReport,
    handleViewRatings,
    handleChat,
    handleCall,
  }) => {
    const theme = useTheme();

    if (isLoading || !profile) {
      return <Loader />;
    }

    const hasReviewerImages =
      profile.reviews.filter(r => Boolean(r.reviewerImage)).length > 0;

    return (
      <ScreenShell title={t.headerTitle} onBack={handleBack}>
        <S.ScrollContent showsVerticalScrollIndicator={false}>
          <S.ContentPadding>
            {/* Hero Profile Card */}
            <ProfileHeroCard
              profile={profile}
              t={t}
              handleChat={handleChat}
              handleCall={handleCall}
            />

            {/* Travel Preferences */}
            {profile.preferences && profile.preferences.length > 0 && (
              <S.SectionCard>
                <S.SectionLabelRow>
                  <S.SectionDot color={theme.colors.primary} />
                  <Typography
                    variant="label"
                    size="xs"
                    weight="bold"
                    color="on_surface_variant"
                  >
                    {(t.preferences || 'PREFERENCES').toUpperCase()}
                  </Typography>
                </S.SectionLabelRow>
                <S.PreferencesWrap>
                  {profile.preferences.map((pref, index) => (
                    <S.PreferenceChip key={index}>
                      <Icon
                        name={pref.icon as any}
                        size={moderateScale(16)}
                        color={theme.colors.primary}
                      />
                      <Typography variant="body" size="xs" weight="medium">
                        {pref.label}
                      </Typography>
                    </S.PreferenceChip>
                  ))}
                </S.PreferencesWrap>
              </S.SectionCard>
            )}

            {/* Assigned Vehicle */}
            {profile.vehicle && (
              <VehicleBentoCard vehicle={profile.vehicle} t={t} />
            )}

            {/* Ratings Breakdown CTA */}
            {profile.ratingCount > 0 && (
              <S.RatingsBreakdownCard
                onPress={handleViewRatings}
                activeOpacity={0.7}
              >
                <Box flexDirection="row" alignItems="center" gap={10}>
                  {hasReviewerImages && (
                    <Box flexDirection="row">
                      {profile.reviews
                        .filter(r => Boolean(r.reviewerImage))
                        .slice(0, 3)
                        .map((review, index) => (
                          <S.ReviewerAvatar
                            key={index}
                            source={{ uri: review.reviewerImage! }}
                          />
                        ))}
                    </Box>
                  )}
                  <Typography variant="title" size="xs" weight="bold">
                    View breakdown of {profile.ratingCount}{' '}
                    {profile.ratingCount === 1 ? 'rating' : 'ratings'}
                  </Typography>
                </Box>
                <Icon
                  name="chevron-right"
                  size={moderateScale(20)}
                  color={theme.colors.on_surface_variant}
                />
              </S.RatingsBreakdownCard>
            )}

            {/* Recent Reviews */}
            <RecentReviewsList reviews={profile.reviews} t={t} />

            {/* Report User */}
            {Boolean(handleReport) && (
              <S.ReportButton onPress={handleReport} activeOpacity={0.8}>
                <Icon
                  name="report-problem"
                  size={moderateScale(18)}
                  color={theme.colors.error}
                />
                <Typography
                  variant="label"
                  size="sm"
                  weight="bold"
                  color={theme.colors.error}
                >
                  {t.reportUser.replace('{{name}}', profile.name)}
                </Typography>
              </S.ReportButton>
            )}
          </S.ContentPadding>
        </S.ScrollContent>
      </ScreenShell>
    );
  },
);

UserProfileDetailTemplate.displayName = 'UserProfileDetailTemplate';

export default UserProfileDetailTemplate;
