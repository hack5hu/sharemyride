import React, { useCallback } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { useTheme } from 'styled-components/native';
import { RideTypeToggleProps, RideType } from './types';
import { ToggleContainer, ToggleButton } from './RideTypeToggle.styles';

export const RideTypeToggle: React.FC<RideTypeToggleProps> = React.memo(({
  selected,
  onSelect,
  localLabel,
  intercityLabel,
}) => {
  const theme = useTheme();

  const handleSelectLocal = useCallback(() => onSelect('local'), [onSelect]);
  const handleSelectIntercity = useCallback(() => onSelect('intercity'), [onSelect]);

  const getColor = (type: RideType) =>
    selected === type ? theme.colors.primary : theme.colors.on_surface_variant;

  return (
    <ToggleContainer>
      <ToggleButton
        isActive={selected === 'local'}
        onPress={handleSelectLocal}
        activeOpacity={0.8}
      >
        <Typography
          variant="body"
          size="md"
          weight={selected === 'local' ? 'bold' : 'regular'}
          color={getColor('local')}
        >
          {localLabel}
        </Typography>
      </ToggleButton>

      <ToggleButton
        isActive={selected === 'intercity'}
        onPress={handleSelectIntercity}
        activeOpacity={0.8}
      >
        <Typography
          variant="body"
          size="md"
          weight={selected === 'intercity' ? 'bold' : 'regular'}
          color={getColor('intercity')}
        >
          {intercityLabel}
        </Typography>
      </ToggleButton>
    </ToggleContainer>
  );
});

RideTypeToggle.displayName = 'RideTypeToggle';
