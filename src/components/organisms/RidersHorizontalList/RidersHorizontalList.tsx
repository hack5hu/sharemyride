import React from 'react';
import { useLocale } from '@/constants/localization';
import { RiderCard } from '@/components/molecules/RiderCard';
import { RidersHorizontalListProps } from './types';
import * as S from './RidersHorizontalList.styles';

export const RidersHorizontalList: React.FC<RidersHorizontalListProps> = ({ 
  riders, 
  spotsLeft 
}) => {
  const { rideDetails } = useLocale();

  return (
    <S.Container>
      <S.Header>
        <S.Title>{rideDetails.otherRiders}</S.Title>
        <S.SpotsBadge>
          <S.SpotsText>
            {rideDetails.spotsLeft.replace('{count}', spotsLeft.toString())}
          </S.SpotsText>
        </S.SpotsBadge>
      </S.Header>
      
      <S.ScrollArea 
        horizontal 
        showsHorizontalScrollIndicator={false}
      >
        {riders.map((rider, index) => (
          <RiderCard key={`${rider.name}-${index}`} {...rider} />
        ))}
      </S.ScrollArea>
    </S.Container>
  );
};
