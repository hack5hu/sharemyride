import React from 'react';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import {
  Container,
  TrackContainer,
  DotMark,
  DashLine,
  InfoContainer,
  LocationBlock,
} from './RouteIndicator.styles';
import { type RouteIndicatorProps } from './types.d';

export const RouteIndicator: React.FC<RouteIndicatorProps> = ({
  pickup,
  dropoff,
}) => {
  const theme = useTheme();
  const labelStyle = { letterSpacing: 1, textTransform: 'uppercase' as const };

  return (
    <Container>
      <TrackContainer>
        <DotMark color={theme.colors.primary} />
        <DashLine />
        <DotMark color={theme.colors.tertiary} />
      </TrackContainer>

      <InfoContainer>
        <LocationBlock>
          <Typography
            variant="label"
            size="xxs"
            weight="bold"
            color="on_surface_variant"
            style={labelStyle}
          >
            Pickup
          </Typography>
          <Typography variant="body" size="sm" weight="semibold">
            {pickup}
          </Typography>
        </LocationBlock>

        <LocationBlock>
          <Typography
            variant="label"
            size="xxs"
            weight="bold"
            color="on_surface_variant"
            style={labelStyle}
          >
            Drop-off
          </Typography>
          <Typography variant="body" size="sm" weight="semibold">
            {dropoff}
          </Typography>
        </LocationBlock>
      </InfoContainer>
    </Container>
  );
};
