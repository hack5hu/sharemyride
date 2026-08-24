import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { Box } from '@/components/atoms/Box';
import { moderateScale } from '@/styles';
import * as S from '../UserProfileDetailTemplate.styles';

export interface RecentReviewsListProps {
  reviews: Array<{
    id: string;
    reviewerName: string;
    reviewerImage?: string | null;
    date: string;
    tripInfo: string;
    rating: number;
    comment: string;
  }>;
  t: any;
}

export const RecentReviewsList: React.FC<RecentReviewsListProps> = React.memo(
  ({ reviews, t }) => {
    const theme = useTheme();

    if (!reviews || reviews.length === 0) return null;

    return (
      <S.SectionCard>
        <S.SectionLabelRow>
          <S.SectionDot color={theme.colors.tertiary} />
          <Typography
            variant="label"
            size="xs"
            weight="bold"
            color="on_surface_variant"
          >
            {(t.recentReviews || 'RECENT REVIEWS').toUpperCase()}
          </Typography>
        </S.SectionLabelRow>

        {reviews.slice(0, 3).map(review => (
          <S.ReviewItem key={review.id}>
            <S.ReviewHeader>
              <S.ReviewerMeta>
                <Avatar
                  source={
                    review.reviewerImage
                      ? { uri: review.reviewerImage }
                      : undefined
                  }
                  placeholder={review.reviewerName}
                  size="sm"
                />
                <Box>
                  <Typography variant="title" size="xs" weight="bold">
                    {review.reviewerName}
                  </Typography>
                  <Typography
                    variant="label"
                    size="xxs"
                    weight="medium"
                    color="on_surface_variant"
                  >
                    {review.date} • {review.tripInfo}
                  </Typography>
                </Box>
              </S.ReviewerMeta>
              <S.StarsRow>
                {[1, 2, 3, 4, 5].map(star => (
                  <Icon
                    key={star}
                    name="star"
                    size={moderateScale(13)}
                    color={
                      star <= review.rating
                        ? theme.colors.warning || '#f59e0b'
                        : theme.colors.surface_container_high
                    }
                  />
                ))}
              </S.StarsRow>
            </S.ReviewHeader>
            {review.comment ? (
              <Typography
                variant="body"
                size="xs"
                color="on_surface"
                style={{ fontStyle: 'italic' }}
              >
                "{review.comment}"
              </Typography>
            ) : null}
          </S.ReviewItem>
        ))}
      </S.SectionCard>
    );
  },
);

RecentReviewsList.displayName = 'RecentReviewsList';
