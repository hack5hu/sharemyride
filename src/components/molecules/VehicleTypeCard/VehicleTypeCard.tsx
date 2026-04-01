import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Container, IconWrapper } from './VehicleTypeCard.styles';
import { VehicleTypeCardProps } from './types';

export const VehicleTypeCard: React.FC<VehicleTypeCardProps> = ({
  icon,
  label,
  selected,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <Container selected={selected} onPress={onPress}>
      <IconWrapper>
        <Icon 
          name={icon} 
          size={24} 
          color={selected ? theme.colors.on_secondary_fixed_variant : theme.colors.on_surface_variant} 
        />
      </IconWrapper>
      <Typography 
        variant="label" 
        size="sm" 
        weight="bold" 
        color={selected ? 'on_secondary_fixed_variant' : 'on_surface_variant'}
        style={{ textAlign: 'center', textTransform: 'uppercase' }}
      >
        {label}
      </Typography>
    </Container>
  );
};
