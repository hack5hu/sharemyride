import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { FareCardProps } from './types';
import * as S from './FareCard.styles';

export const FareCard: React.FC<FareCardProps> = ({ amount, currency = '$', onPress }) => {
  const theme = useTheme();
  const { rideDetails } = useLocale();

  return (
    <S.Container onPress={onPress}>
      <S.LeftContent>
        <S.IconContainer>
          <Icon name="payments" size={24} color={theme.colors.primary} />
        </S.IconContainer>
        <S.TextContainer>
          <S.Title>{rideDetails.totalFare}</S.Title>
          <S.Value>{currency}{amount}</S.Value>
        </S.TextContainer>
      </S.LeftContent>
      <Icon name="chevron-right" size={24} color={theme.colors.outline_variant} />
    </S.Container>
  );
};
