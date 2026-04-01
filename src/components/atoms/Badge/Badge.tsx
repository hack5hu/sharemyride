import React from 'react';
import styled from 'styled-components/native';
import { Typography } from '../Typography';
import { moderateScale } from '@/styles';

export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const Container = styled.View<{ variant: string }>`
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary': return theme.colors.primary_fixed;
      case 'secondary': return theme.colors.secondary_fixed;
      case 'tertiary': return theme.colors.tertiary_fixed;
      default: return theme.colors.surface_container_high;
    }
  }};
  padding-horizontal: ${moderateScale(12)}px;
  padding-vertical: ${moderateScale(4)}px;
  border-radius: ${moderateScale(100)}px;
`;

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary' }) => {
  return (
    <Container variant={variant}>
      <Typography variant="label" size="sm" weight="bold" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
        {label}
      </Typography>
    </Container>
  );
};
