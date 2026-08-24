import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { Loader } from '@/components/atoms/Loader';
import { Box } from '@/components/atoms/Box';
import { FlashList } from '@shopify/flash-list';
import { moderateScale } from '@/styles';
import { UserRatingsTemplateProps } from './types';
import * as S from './UserRatingsTemplate.styles';
import { UserReview } from '@/screens/Common/UserProfileDetail/types';

export const UserRatingsTemplate: React.FC<UserRatingsTemplateProps> = React.memo(
  ({ userName, reviews, isLoading, onBack }) => {
    const theme = useTheme();

    if (isLoading) {
      return (
        <ScreenShell title={userName} onBack={onBack}>
          <Loader />
        </ScreenShell>
      );
    }

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? Number(
            (
              reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) /
              totalReviews
            ).toFixed(1),
          )
        : 0;

    const renderItem = ({ item }: { item: UserReview }) => (
      <S.ReviewCard>
        <S.ReviewHeader>
          <S.ReviewerInfo>
            <Avatar
              source={
                item.reviewerImage ? { uri: item.reviewerImage } : undefined
              }
              placeholder={item.reviewerName}
              size="sm"
            />
            <Box>
              <Typography variant="title" size="xs" weight="bold">
                {item.reviewerName}
              </Typography>
              <Typography
                variant="label"
                size="xxs"
                weight="medium"
                color="on_surface_variant"
              >
                {item.date} • {item.tripInfo}
              </Typography>
            </Box>
          </S.ReviewerInfo>
          <S.StarsRow>
            {[1, 2, 3, 4, 5].map(star => (
              <Icon
                key={star}
                name="star"
                size={moderateScale(14)}
                color={
                  star <= item.rating
                    ? theme.colors.warning || '#f59e0b'
                    : theme.colors.surface_container_high
                }
              />
            ))}
          </S.StarsRow>
        </S.ReviewHeader>
        {item.comment ? (
          <S.ReviewComment>"{item.comment}"</S.ReviewComment>
        ) : null}
      </S.ReviewCard>
    );

    const ListHeader = () => {
      if (totalReviews === 0) return null;
      return (
        <S.RatingSummaryBanner>
          <S.ScoreRow>
            <Icon
              name="star"
              size={moderateScale(28)}
              color={theme.colors.warning || '#f59e0b'}
            />
            <Typography variant="headline" size="md" weight="bold">
              {averageRating.toFixed(1)}
            </Typography>
          </S.ScoreRow>
          <Typography
            variant="label"
            size="xs"
            weight="medium"
            color="on_surface_variant"
          >
            Based on {totalReviews}{' '}
            {totalReviews === 1 ? 'verified rating' : 'verified ratings'}
          </Typography>
        </S.RatingSummaryBanner>
      );
    };

    return (
      <S.Container>
        <ScreenShell title={`${userName.trim()}'s Ratings`} onBack={onBack}>
          <S.ContentContainer>
            {totalReviews === 0 ? (
              <S.EmptyStateWrapper>
                <S.EmptyIconCircle>
                  <Icon
                    name="star-outline"
                    size={moderateScale(32)}
                    color={theme.colors.primary}
                  />
                </S.EmptyIconCircle>
                <Typography variant="title" size="sm" weight="bold">
                  No Ratings Yet
                </Typography>
                <Typography
                  variant="body"
                  size="xs"
                  color="on_surface_variant"
                  align="center"
                >
                  This member hasn't received any reviews or ratings yet.
                </Typography>
              </S.EmptyStateWrapper>
            ) : (
              <FlashList
                data={reviews}
                renderItem={renderItem}
                ListHeaderComponent={ListHeader}
                // @ts-ignore
                estimatedItemSize={110}
                showsVerticalScrollIndicator={false}
              />
            )}
          </S.ContentContainer>
        </ScreenShell>
      </S.Container>
    );
  },
);

UserRatingsTemplate.displayName = 'UserRatingsTemplate';
export default UserRatingsTemplate;
