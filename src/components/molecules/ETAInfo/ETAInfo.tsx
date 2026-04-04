import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { ETAInfoProps } from './types';
import * as S from './ETAInfo.styles';

export const ETAInfo: React.FC<ETAInfoProps> = ({ arrivalTime, minutesAway }) => {
  const theme = useTheme();
  const { rideDetails } = useLocale();

  return (
    <S.Container>
      <S.TopSection>
        <S.Title>{rideDetails.estimatedArrival}</S.Title>
        <S.TimeLabel>{arrivalTime}</S.TimeLabel>
      </S.TopSection>
      <S.BottomSection>
        <Icon 
          name="schedule" 
          size={20} 
          color={theme.colors.on_primary_fixed_variant} 
        />
        <S.AwayText>
          {rideDetails.minsAway.replace('{count}', minutesAway.toString())}
        </S.AwayText>
      </S.BottomSection>
    </S.Container>
  );
};
