import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { Loader } from '@/components/atoms/Loader';
import { Avatar } from '@/components/atoms/Avatar';
import { UserProfileDetailTemplateProps } from './types';
import * as S from './UserProfileDetailTemplate.styles';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { VehicleBentoCard } from './components/VehicleBentoCard';
import { RecentReviewsList } from './components/RecentReviewsList';

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
          <S.ProfileHero>
            <S.AvatarWrapper>
              <Avatar
                source={
                  profile.profileImage
                    ? { uri: profile.profileImage }
                    : undefined
                }
                placeholder={profile.name}
                size="lg"
                isVerified={profile.isVerified}
              />
            </S.AvatarWrapper>

            <S.HeroName>{profile.name}</S.HeroName>

            <S.StatsRow>
              {profile.isVerified && (
                <S.VerifiedTag>
                  <Icon
                    name="verified"
                    size={14}
                    color={theme.colors.on_primary_fixed_variant}
                  />
                  <Typography
                    variant="label"
                    size="sm"
                    weight="bold"
                    color={theme.colors.on_primary_fixed_variant}
                  >
                    {t.verifiedMember}
                  </Typography>
                </S.VerifiedTag>
              )}
              <S.RatingBadge>
                <Icon name="star" size={14} color={theme.colors.primary} />
                <Typography variant="label" size="sm" weight="bold">
                  {profile.rating} ·{' '}
                  {t.rideCountLabel.replace(
                    '{{count}}',
                    String(profile.ratingCount),
                  )}
                </Typography>
              </S.RatingBadge>
            </S.StatsRow>

            {handleChat && (
              <S.ChatButton onPress={handleChat} activeOpacity={0.8}>
                <Icon
                  name="chat-bubble-outline"
                  size={18}
                  color={theme.colors.on_primary}
                />
                <Typography
                  variant="label"
                  size="md"
                  weight="bold"
                  color="on_primary"
                >
                  Chat with {profile.name.split(' ')[0]}
                </Typography>
              </S.ChatButton>
            )}
          </S.ProfileHero>

          <S.Section>
            <S.SectionTitleLabel>{t.preferences}</S.SectionTitleLabel>
            <S.PreferencesContainer>
              {profile.preferences.map((pref, index) => (
                <S.PreferenceTag key={index}>
                  <Icon
                    name={pref.icon as any}
                    size={18}
                    color={theme.colors.primary}
                  />
                  <Typography variant="body" size="sm" weight="medium">
                    {pref.label}
                  </Typography>
                </S.PreferenceTag>
              ))}
            </S.PreferencesContainer>
          </S.Section>

          {profile.vehicle && (
            <VehicleBentoCard vehicle={profile.vehicle} t={t} />
          )}

          <S.Section>
            <S.RatingsBreakdown onPress={handleViewRatings}>
              <Box flexDirection="row" alignItems="center">
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
                <S.RatingsBreakdownText $hasAvatars={hasReviewerImages}>
                  {t.viewRatings.replace(
                    '{{count}}',
                    profile.ratingCount.toString(),
                  )}
                </S.RatingsBreakdownText>
              </Box>
              <Icon
                name="arrow-forward"
                size={20}
                color={theme.colors.on_secondary_container}
              />
            </S.RatingsBreakdown>
          </S.Section>

          <RecentReviewsList reviews={profile.reviews} t={t} />

          <S.Section>
            <S.ReportButton onPress={handleReport}>
              <Icon name="report" size={20} color={theme.colors.error} />
              <Typography
                variant="label"
                size="md"
                weight="bold"
                color={theme.colors.error}
              >
                {t.reportUser.replace('{{name}}', profile.name)}
              </Typography>
            </S.ReportButton>
          </S.Section>
        </S.ScrollContent>
      </ScreenShell>
    );
  },
);

UserProfileDetailTemplate.displayName = 'UserProfileDetailTemplate';

export default UserProfileDetailTemplate;
