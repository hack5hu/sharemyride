import React from 'react';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { type VerifiedBadgeProps } from './types.d';
import { Container, StyledIcon } from './VerifiedBadge.styles';

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 16 }) => {
  const theme = useTheme();

  return (
    <Container size={size}>
      <StyledIcon
        name="check"
        size={moderateScale(size * 0.65)}
        color={theme.colors.on_primary || '#FFFFFF'}
      />
    </Container>
  );
};
