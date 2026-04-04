import React from 'react';
import { Container, LabelText } from './StatusBadge.styles';
import { StatusBadgeProps } from './types.d';

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  label, 
  variant = 'primary', 
  isUppercase = true 
}) => {
  return (
    <Container variant={variant}>
      <LabelText variant={variant} style={{ letterSpacing: 0.8 }}>
        {isUppercase ? label.toUpperCase() : label}
      </LabelText>
    </Container>
  );
};
