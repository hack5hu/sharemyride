import React from 'react';
import { useTheme } from 'styled-components/native';
import { useTranslation } from '@/hooks/useTranslation';
import { StatValue } from '../../atoms/StatValue';
import { Typography } from '../../atoms/Typography';
import {
  CardContainer,
  CardHeader,
  CardFooter,
  BlurElement,
  ScoreDescrText,
  ScoreIcon,
} from './TrustScoreCard.styles';

export interface TrustScoreCardProps {
  score: number | string;
}

export const TrustScoreCard: React.FC<TrustScoreCardProps> = ({ score }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <CardContainer
      colors={[theme.colors.primary_container, theme.colors.primary]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 1 }}
    >
      <BlurElement />

      <CardHeader>
        <Typography variant="title" size="lg" weight="bold" color="on_primary">
          {t('profileHub.trustScore')}
        </Typography>
        <ScoreDescrText
          variant="label"
          size="sm"
          color="on_primary"
        >
          {t('profileHub.trustScoreDescr')}
        </ScoreDescrText>
      </CardHeader>

      <CardFooter>
        <StatValue size="xl">{`${score}%`}</StatValue>
        <ScoreIcon
          name="auto-awesome"
          size={40}
          color="on_primary"
        />
      </CardFooter>
    </CardContainer>
  );
};
