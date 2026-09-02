import React from 'react';
import { Container, LabelText } from './StatusBadge.styles';
import { type StatusBadgeProps } from './types.d';

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'primary',
  isUppercase = true,
}) => {
  return (
    <Container variant={variant}>
      <LabelText variant={variant}>
        {isUppercase ? label.toUpperCase() : label}
      </LabelText>
    </Container>
  );
};
