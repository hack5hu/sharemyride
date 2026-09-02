import React from 'react';
import { RatingTemplate } from '@/components/templates/RatingTemplate';
import * as S from './Rating.styles';
import { type RatingScreenProps } from './types';
import { useRating } from './useRating';

export const RatingScreen: React.FC<RatingScreenProps> = React.memo(
  ({ route }) => {
    const {
      t,
      targetUserName,
      targetUserRole,
      targetUserAvatar,
      categories,
      ratings,
      onRatingChange,
      reviewText,
      onReviewChange,
      onSubmit,
      onBack,
      isSubmitting,
    } = useRating(route.params);

    return (
      <S.Container>
        <RatingTemplate
          t={t}
          targetUserName={targetUserName}
          targetUserRole={targetUserRole}
          targetUserAvatar={targetUserAvatar}
          categories={categories}
          ratings={ratings}
          onRatingChange={onRatingChange}
          reviewText={reviewText}
          onReviewChange={onReviewChange}
          onSubmit={onSubmit}
          onBack={onBack}
          isSubmitting={isSubmitting}
        />
      </S.Container>
    );
  },
);

export default RatingScreen;
