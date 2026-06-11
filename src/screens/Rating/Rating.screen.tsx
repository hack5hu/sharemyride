import React from 'react';
import { RatingTemplate } from '@/components/templates/RatingTemplate';
import { useRating } from './useRating';
import { RatingScreenProps } from './types';
import * as S from './Rating.styles';

export const RatingScreen: React.FC<RatingScreenProps> = React.memo(
  ({ route }) => {
    const {
      t,
      targetUserName,
      targetUserRole,
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
