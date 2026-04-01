import React from 'react';
import styled from 'styled-components/native';
import { Typography } from '../../atoms/Typography';
import { StatValue } from '@/components/atoms/StatValue';

import { moderateScale } from '@/styles';

export interface StatItemProps {
  label: string;
  value: string | number;
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  gap: ${moderateScale(2)}px;
`;

const Label = styled(Typography)`
  text-transform: uppercase;
  letter-spacing: -0.5px;
`;

export const StatItem: React.FC<StatItemProps> = ({ label, value }) => {
  return (
    <Container>
      <StatValue size="md">{value}</StatValue>
      <Label variant="label" size="sm" weight="semibold" color="on_surface_variant">
        {label}
      </Label>
    </Container>
  );
};
