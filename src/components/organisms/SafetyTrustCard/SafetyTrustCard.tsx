import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { SafetyTrustCardProps } from './types';
import * as S from './SafetyTrustCard.styles';

export const SafetyTrustCard: React.FC<SafetyTrustCardProps> = ({ onPress }) => {
  const theme = useTheme();
  const { rideDetails } = useLocale();

  return (
    <S.Container
      colors={[
        `${theme.colors.primary_container}0D`,
        `${theme.colors.secondary_container}1A`,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <S.IconContainer>
        <Icon name="verified-user" size={24} color="white" />
      </S.IconContainer>
      <S.Content>
        <S.Title>{rideDetails.trustTitle}</S.Title>
        <S.Description>{rideDetails.trustDescription}</S.Description>
      </S.Content>
    </S.Container>
  );
};
