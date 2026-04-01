import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '../../atoms/Typography';
import { StatValue } from '../../atoms/StatValue';
import { CardContainer, CardHeader, CardFooter, BlurElement } from './TrustScoreCard.styles';
import { useTranslation } from '@/hooks/useTranslation';

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
        <Typography 
          variant="label" 
          size="sm" 
          color="on_primary" 
          style={{ opacity: 0.8, marginTop: 4 }}
        >
          {t('profileHub.trustScoreDescr')}
        </Typography>
      </CardHeader>

      <CardFooter>
        <StatValue size="xl">{`${score}%`}</StatValue>
        <Icon 
          name="auto-awesome" 
          size={40} 
          color="on_primary" 
          style={{ opacity: 0.5 }} 
        />
      </CardFooter>
    </CardContainer>
  );
};
