import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { Loader } from '@/components/atoms/Loader';
import { Box } from '@/components/atoms/Box';
import { FlashList } from '@shopify/flash-list';
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

    const renderItem = ({ item }: { item: UserReview }) => (
      <S.ReviewCard>
        <S.ReviewHeader>
          <S.ReviewerInfo>
            <Avatar
              source={item.reviewerImage ? { uri: item.reviewerImage } : undefined}
              placeholder={item.reviewerName}
              size="sm"
            />
            <Box>
              <Typography variant="label" size="md" weight="bold">
                {item.reviewerName}
              </Typography>
              <Typography
                variant="body"
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
                size={12}
                color={
                  star <= item.rating
                    ? theme.colors.primary
                    : theme.colors.outline_variant
                }
              />
            ))}
          </S.StarsRow>
        </S.ReviewHeader>
        <Typography
          variant="body"
          size="sm"
          weight="medium"
          color="on_surface_variant"
          style={{ fontStyle: 'italic', lineHeight: 20 }}
        >
          "{item.comment}"
        </Typography>
      </S.ReviewCard>
    );

    return (
      <S.Container>
        <ScreenShell title={`${userName.trim()}'s Ratings`} onBack={onBack}>
          <S.ContentContainer>
            {reviews.length === 0 ? (
              <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body" size="md" color="on_surface_variant">
                  No ratings or reviews yet.
                </Typography>
              </Box>
            ) : (
              <FlashList
                data={reviews}
                renderItem={renderItem}
                // @ts-ignore
                estimatedItemSize={120}
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
