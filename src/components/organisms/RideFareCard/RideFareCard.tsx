import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import * as S from './RideFareCard.styles';

interface RideFareCardProps {
  price: number;
}

export const RideFareCard: React.FC<RideFareCardProps> = ({ price }) => {
  const theme = useTheme();

  return (
    <S.FareCard
      colors={[theme.colors.primary, theme.colors.primary_container]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <S.FareLabel>
        <Typography variant="label" size="xs" weight="bold" color="on_primary">
          YOUR FARE
        </Typography>
        <S.FarePriceBig>₹{price.toFixed(0)}</S.FarePriceBig>
        <S.PerSeatNote>per seat · no hidden fees</S.PerSeatNote>
      </S.FareLabel>
      <S.FareIconBox>
        <Icon name="currency-rupee" size={moderateScale(32)} color="#FFFFFF" />
      </S.FareIconBox>
    </S.FareCard>
  );
};
