import React from 'react';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { RouteIndicator } from '@/components/molecules/RouteIndicator';
import { 
  Container, 
  Header, 
  BadgeWrapper, 
  DateTimeText, 
  RouteWrapper 
} from './RideSummaryCard.styles';
import { RideSummaryCardProps } from './types.d';

export const RideSummaryCard: React.FC<RideSummaryCardProps> = ({
  pickup,
  dropoff,
  date,
  time,
  type,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <Header>
        <BadgeWrapper>
          <Typography variant="label" size="xxs" weight="bold" color="on_secondary_fixed_variant" style={{ letterSpacing: 1.5, textTransform: 'uppercase' }}>
            {type}
          </Typography>
        </BadgeWrapper>
        <DateTimeText>{date} • {time}</DateTimeText>
      </Header>
      
      <RouteWrapper>
        <RouteIndicator pickup={pickup} dropoff={dropoff} />
      </RouteWrapper>
    </Container>
  );
};
