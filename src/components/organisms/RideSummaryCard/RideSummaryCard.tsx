import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTheme } from 'styled-components/native';
import { RouteIndicator } from '@/components/molecules/RouteIndicator';
import {
  Container,
  Header,
  BadgeWrapper,
  DateTimeText,
  BadgeText,
  RouteWrapper,
} from './RideSummaryCard.styles';
import { type RideSummaryCardProps } from './types.d';

export const RideSummaryCard: React.FC<RideSummaryCardProps> = ({
  pickup,
  dropoff,
  date,
  time,
  type,
}) => {
  return (
    <Container>
      <Header>
        <BadgeWrapper>
          <BadgeText
            variant="label"
            size="xxs"
            weight="bold"
            color="on_secondary_fixed_variant"
          >
            {type}
          </BadgeText>
        </BadgeWrapper>
        <DateTimeText>
          {date} • {time}
        </DateTimeText>
      </Header>

      <RouteWrapper>
        <RouteIndicator pickup={pickup} dropoff={dropoff} />
      </RouteWrapper>
    </Container>
  );
};
