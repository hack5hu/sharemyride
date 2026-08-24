import React from 'react';
import styled from 'styled-components/native';
import { Typography } from '../Typography';
import { moderateScale } from '@/styles';
import { ColorToken } from '@/theme/types';

export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const Container = styled.View<{ variant: string }>`
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return theme.name === 'dark'
          ? `${theme.colors.primary}26`
          : theme.colors.primary_fixed;
      case 'secondary':
        return theme.name === 'dark'
          ? `${theme.colors.secondary}26`
          : theme.colors.secondary_fixed;
      case 'tertiary':
        return theme.name === 'dark'
          ? `${theme.colors.tertiary}26`
          : theme.colors.tertiary_fixed;
      default:
        return theme.colors.surface_container_high;
    }
  }};
  padding-horizontal: ${moderateScale(10)}px;
  padding-vertical: ${moderateScale(3)}px;
  border-radius: ${moderateScale(100)}px;
  border-width: ${({ theme }) => (theme.name === 'dark' ? '1px' : '0px')};
  border-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return `${theme.colors.primary}4D`;
      case 'secondary':
        return `${theme.colors.secondary}4D`;
      case 'tertiary':
        return `${theme.colors.tertiary}4D`;
      default:
        return 'transparent';
    }
  }};
`;

const LabelText = styled(Typography)`
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary' }) => {
  const getTextColor = (): ColorToken => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'tertiary':
        return 'tertiary';
      default:
        return 'on_surface_variant';
    }
  };

  return (
    <Container variant={variant}>
      <LabelText
        variant="label"
        size="xs"
        weight="bold"
        color={getTextColor()}
      >
        {label}
      </LabelText>
    </Container>
  );
};
