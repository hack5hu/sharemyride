import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { Box } from '@/components/atoms/Box';
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

export const RecentReviewsList: React.FC<RecentReviewsListProps> = React.memo(({
  reviews,
  t,
}) => {
  const theme = useTheme();

  return (
    <S.Section>
      <S.SectionTitleLabel>
        {t.recentReviews}
      </S.SectionTitleLabel>
      {reviews.slice(0, 2).map(review => (
        <S.ReviewCard key={review.id}>
          <S.ReviewHeader>
            <S.ReviewerInfo>
              <Avatar
                source={review.reviewerImage ? { uri: review.reviewerImage } : undefined}
                placeholder={review.reviewerName}
                size="sm"
              />
              <Box>
                <Typography variant="label" size="md" weight="bold">
                  {review.reviewerName}
                </Typography>
                <Typography
                  variant="body"
                  size="xxs"
                  weight="medium"
                  color="on_surface_variant"
                >
                  {review.date} • {review.tripInfo}
                </Typography>
              </Box>
            </S.ReviewerInfo>
            <S.StarsRow>
              {[1, 2, 3, 4, 5].map(star => (
                <Icon
                  key={star}
                  name="star"
                  size={12}
                  color={
                    star <= review.rating
                      ? theme.colors.primary
                      : theme.colors.outline_variant
                  }
                />
              ))}
            </S.StarsRow>
          </S.ReviewHeader>
          <S.ReviewComment>
            "{review.comment}"
          </S.ReviewComment>
        </S.ReviewCard>
      ))}
    </S.Section>
  );
});

RecentReviewsList.displayName = 'RecentReviewsList';
