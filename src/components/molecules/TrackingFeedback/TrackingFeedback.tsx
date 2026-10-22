import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Container, Label } from './TrackingFeedback.styles';
import { useTrackingFeedback } from './useTrackingFeedback';
import type { TrackingFeedbackProps } from './types.d';

export const TrackingFeedback = React.memo((props: TrackingFeedbackProps) => {
  const { label, description, isLive, updated } = useTrackingFeedback(props);

  return (
    <Container>
      <Label $live={isLive} variant="label" weight="bold" accessibilityLiveRegion="polite">
        {label}
      </Label>
      <Typography variant="body" size="sm" color="on_surface_variant">{description}</Typography>
      {updated && <Typography variant="label" color="on_surface_variant">{updated}</Typography>}
    </Container>
  );
});
TrackingFeedback.displayName = 'TrackingFeedback';
