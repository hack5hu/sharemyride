import React from 'react';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import * as S from './RatingInvitationCard.styles';

export interface RatingInvitationCardProps {
  hasRated: boolean;
  driverName: string;
  onRateDriver: () => void;
  t: {
    ratingCardTitle: string;
    ratingCardSubtitle: string;
    rateButtonText: string;
  };
}

export const RatingInvitationCard: React.FC<RatingInvitationCardProps> = ({
  hasRated,
  driverName,
  onRateDriver,
  t,
}) => {
  return (
    <S.RatingCardContainer>
      <S.RatingLabelRow>
        <S.RatingDot />
        <Typography
          variant="label"
          size="xs"
          weight="bold"
          color="on_surface"
        >
          {t.ratingCardTitle.toUpperCase()}
        </Typography>
      </S.RatingLabelRow>

      {hasRated ? (
        <S.SubtitleText
          variant="body"
          size="sm"
          color="on_surface_variant"
        >
          You have given rating to this driver.
        </S.SubtitleText>
      ) : (
        <>
          <S.SubtitleText
            variant="body"
            size="sm"
            color="on_surface_variant"
          >
            {t.ratingCardSubtitle.replace('{{name}}', driverName)}
          </S.SubtitleText>
          <Button variant="primary" onPress={onRateDriver}>
            {t.rateButtonText}
          </Button>
        </>
      )}
    </S.RatingCardContainer>
  );
};
