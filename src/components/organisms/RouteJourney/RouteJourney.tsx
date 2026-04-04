import React from 'react';
import { useTheme } from 'styled-components/native';
import { StopItem } from '@/components/molecules/StopItem';
import { RouteJourneyProps } from './types';
import * as S from './RouteJourney.styles';

export const RouteJourney: React.FC<RouteJourneyProps> = ({ stops }) => {
  const theme = useTheme();

  return (
    <S.Container>
      <S.ConnectorLine
        colors={[
          theme.colors.primary,
          theme.colors.outline_variant,
          theme.colors.tertiary,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <S.StopsContainer>
        {stops.map((stop, index) => (
          <StopItem
            key={`${stop.type}-${index}`}
            {...stop}
            isFirst={index === 0}
            isLast={index === stops.length - 1}
          />
        ))}
      </S.StopsContainer>
    </S.Container>
  );
};
/* 
Wait, the connector line needs to be positioned correctly behind the icons.
Padding of S.Container is 24px.
Icon width is 24px. Center is 12px.
So left = 24 + 12 = 36px.
In Styles I used scale(35).
Let's see. 
*/
