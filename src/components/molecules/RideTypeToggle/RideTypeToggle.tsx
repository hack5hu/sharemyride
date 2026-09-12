import React, { useCallback } from 'react';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { ToggleContainer, ToggleButton } from './RideTypeToggle.styles';
import { RideType, type RideTypeToggleProps } from './types';

export const RideTypeToggle: React.FC<RideTypeToggleProps> = React.memo(
  ({ selected, onSelect, localLabel, intercityLabel }) => {
    const theme = useTheme();

    const handleSelectLocal = useCallback(
      () => onSelect(RideType.LOCAL),
      [onSelect],
    );
    const handleSelectIntercity = useCallback(
      () => onSelect(RideType.INTERCITY),
      [onSelect],
    );

    const getColor = (type: RideType) =>
      selected === type
        ? theme.colors.primary
        : theme.colors.on_surface_variant;

    return (
      <ToggleContainer>
        <ToggleButton
          isActive={selected === RideType.LOCAL}
          onPress={handleSelectLocal}
          activeOpacity={0.8}
        >
          <Typography
            variant="body"
            size="md"
            weight={selected === RideType.LOCAL ? 'bold' : 'regular'}
            color={getColor(RideType.LOCAL)}
          >
            {localLabel}
          </Typography>
        </ToggleButton>

        <ToggleButton
          isActive={selected === RideType.INTERCITY}
          onPress={handleSelectIntercity}
          activeOpacity={0.8}
        >
          <Typography
            variant="body"
            size="md"
            weight={selected === RideType.INTERCITY ? 'bold' : 'regular'}
            color={getColor(RideType.INTERCITY)}
          >
            {intercityLabel}
          </Typography>
        </ToggleButton>
      </ToggleContainer>
    );
  },
);

RideTypeToggle.displayName = 'RideTypeToggle';
