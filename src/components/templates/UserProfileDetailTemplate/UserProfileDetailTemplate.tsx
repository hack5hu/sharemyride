import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { IconButton } from '@/components/atoms/IconButton';
import { Typography } from '@/components/atoms/Typography';
import { Loader } from '@/components/atoms/Loader';
import { Avatar } from '@/components/atoms/Avatar';
import { UserProfileDetailTemplateProps } from './types';
import * as S from './UserProfileDetailTemplate.styles';
import { ScreenShell } from '@/components/molecules/ScreenShell';

export const UserProfileDetailTemplate: React.FC<UserProfileDetailTemplateProps> = ({
  profile,
  isLoading,
  t,
  handleBack,
  handleReport,
  handleViewRatings,
}) => {
  const theme = useTheme();

  if (isLoading || !profile) {
    return <Loader />;
  }

  return (
    <ScreenShell title={t.headerTitle} onBack rightElement={
      <IconButton icon="more-vert" variant="surface" />
    } >

      <S.ScrollContent showsVerticalScrollIndicator={false}>
        <S.ProfileHero>
          <S.AvatarWrapper>
            <Avatar 
              source={profile.profileImage ? { uri: profile.profileImage } : undefined} 
              placeholder={profile.name}
              size="lg"
              isVerified={profile.isVerified}
            />
          </S.AvatarWrapper>
          
          <Typography variant="headline" size="lg" weight="bold" style={{ marginTop: 16 }}>
            {profile.name}
          </Typography>
          
          <S.StatsRow>
            {profile.isVerified && (
              <S.VerifiedTag>
                <Icon name="verified" size={14} color={theme.colors.on_primary_fixed_variant} />
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_primary_fixed_variant}>
                  {t.verifiedMember}
                </Typography>
              </S.VerifiedTag>
            )}
            <S.RatingBadge>
              <Icon name="star" size={14} color={theme.colors.primary} />
              <Typography variant="label" size="sm" weight="bold">
                {profile.rating} ({profile.ratingCount})
              </Typography>
            </S.RatingBadge>
          </S.StatsRow>
        </S.ProfileHero>

        <S.Section>
          <Typography variant="label" size="sm" weight="bold" color="outline" style={{ textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
            {t.preferences}
          </Typography>
          <S.PreferencesContainer>
            {profile.preferences.map((pref, index) => (
              <S.PreferenceTag key={index}>
                <Icon name={pref.icon as any} size={18} color={theme.colors.primary} />
                <Typography variant="body" size="sm" weight="medium">
                  {pref.label}
                </Typography>
              </S.PreferenceTag>
            ))}
          </S.PreferencesContainer>
        </S.Section>

        {profile.vehicle && (
          <S.Section>
            <Typography variant="label" size="sm" weight="bold" color="outline" style={{ textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
              {t.vehicleInfo}
            </Typography>
            <S.BentoCard>
              <S.BentoHeader>
                <Typography variant="label" size="sm" color="outline">{t.vehicleInfo.toUpperCase()}</Typography>
                <Icon name="electric-car" size={20} color={theme.colors.primary} />
              </S.BentoHeader>
              <S.VehicleInfo>
                <S.VehicleIconContainer>
                  <Icon name="directions-car" size={30} color={theme.colors.primary_container} />
                </S.VehicleIconContainer>
                <S.VehicleDetails>
                  <Typography variant="title" size="md" weight="bold">
                    {profile.vehicle.model}
                  </Typography>
                  <Typography variant="body" size="xs" weight="medium" color="on_surface_variant">
                    {profile.vehicle.color} • {profile.vehicle.plateNumber}
                  </Typography>
                  {profile.vehicle.tag && (
                    <S.TagRow>
                      <S.StatusDot />
                      <Typography variant="label" size="sm" color="primary" weight="bold">
                        {profile.vehicle.tag.toUpperCase()}
                      </Typography>
                    </S.TagRow>
                  )}
                </S.VehicleDetails>
              </S.VehicleInfo>
            </S.BentoCard>
          </S.Section>
        )}

        <S.Section>
          <S.RatingsBreakdown onPress={handleViewRatings}>
            <S.Row>
              <S.ReviewersAvatars>
                {profile.reviews.slice(0, 3).map((review, index) => (
                  <S.ReviewerAvatar key={index} source={{ uri: `https://i.pravatar.cc/100?u=${review.id}` }} />
                ))}
              </S.ReviewersAvatars>
              <Typography variant="label" size="md" weight="bold" color="on_secondary_container" style={{ marginLeft: 12 }}>
                {t.viewRatings.replace('{{count}}', profile.ratingCount.toString())}
              </Typography>
            </S.Row>
            <Icon name="arrow-forward" size={20} color={theme.colors.on_secondary_container} />
          </S.RatingsBreakdown>
        </S.Section>

        <S.Section>
          <Typography variant="label" size="sm" weight="bold" color="outline" style={{ textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
            {t.recentReviews}
          </Typography>
          {profile.reviews.map((review) => (
            <S.ReviewCard key={review.id}>
              <S.ReviewHeader>
                <S.ReviewerInfo>
                  <Avatar source={{ uri: `https://i.pravatar.cc/100?u=${review.id}` }} size="sm" />
                  <Box>
                    <Typography variant="label" size="md" weight="bold">
                      {review.reviewerName}
                    </Typography>
                    <Typography variant="body" size="xxs" weight="medium" color="on_surface_variant">
                      {review.date} • {review.tripInfo}
                    </Typography>
                  </Box>
                </S.ReviewerInfo>
                <S.StarsRow>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon 
                      key={star} 
                      name="star" 
                      size={12} 
                      color={star <= review.rating ? theme.colors.primary : theme.colors.outline_variant} 
                    />
                  ))}
                </S.StarsRow>
              </S.ReviewHeader>
              <Typography variant="body" size="sm" weight="medium" color="on_surface_variant" style={{ fontStyle: 'italic', lineHeight: 20 }}>
                "{review.comment}"
              </Typography>
            </S.ReviewCard>
          ))}
        </S.Section>

        <S.Section>
          <S.ReportButton onPress={handleReport}>
            <Icon name="report" size={20} color={theme.colors.error} />
            <Typography variant="label" size="md" weight="bold" color={theme.colors.error}>
              {t.reportUser.replace('{{name}}', profile.name)}
            </Typography>
          </S.ReportButton>
        </S.Section>
      </S.ScrollContent>
    </ScreenShell>
  );
};

export default React.memo(UserProfileDetailTemplate);
