import React from 'react';
import { Container, Chip } from './ColorChip.styles';
import { Typography } from '@/components/atoms/Typography';
import { ColorChipProps } from './types';

export const ColorChip: React.FC<ColorChipProps> = ({
  color,
  selected,
  onPress,
  label,
}) => {
  return (
    <Container selected={selected} onPress={onPress}>
      <Chip color={color} selected={selected} />

      {label && (
        <Typography 
          variant="label" 
          size="sm" 
          weight={selected ? 'bold' : 'regular'} 
          color={selected ? 'primary' : 'on_surface_variant'}
        >
          {label}
        </Typography>
      )}
    </Container>
  );
};
