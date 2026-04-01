import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Container } from './Chip.styles';
import { ChipProps } from './types';

export const Chip: React.FC<ChipProps> = ({ 
  label, 
  selected, 
  onPress, 
  ...props 
}) => {
  return (
    <Container 
      selected={selected} 
      onPress={onPress} 
      activeOpacity={0.7}
      {...props}
    >
      <Typography 
        variant="label" 
        size="md" 
        weight={selected ? 'bold' : 'medium'}
        color={selected ? 'on_primary_container' : 'on_surface_variant'}
      >
        {label}
      </Typography>
    </Container>
  );
};
