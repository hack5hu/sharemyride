import styled from 'styled-components/native';
import { responsiveFont } from '@/styles';
import { TypographyProps, TypographyVariant, TypographySize, TypographyWeight } from './types';

const getFontSize = (variant: TypographyVariant, size: TypographySize) => {
  const sizes = {
    display: { sm: 36, md: 44, lg: 52, xl: 60 },
    headline: { sm: 24, md: 28, lg: 32, xl: 36 },
    title: { sm: 14, md: 16, lg: 20, xl: 22 },
    body: { sm: 12, md: 14, lg: 16, xl: 18 },
    label: { sm: 10, md: 11, lg: 12, xl: 14 },
  };
  return responsiveFont(sizes[variant][size]);
};

const getFontWeight = (variant: TypographyVariant, weight?: TypographyWeight) => {
  if (weight) {
    const weights = {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    };
    return weights[weight];
  }
  
  // Default weights per variant
  const defaults = {
    display: '700',
    headline: '700',
    title: '600',
    body: '400',
    label: '500',
  };
  return defaults[variant];
};

export const StyledText = styled.Text<TypographyProps>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${({ variant = 'body', size = 'md' }) => getFontSize(variant, size)}px;
  font-weight: ${({ variant = 'body', weight }) => getFontWeight(variant, weight)};
  color: ${({ theme, color }) => color || theme.colors.on_surface};
  text-align: ${({ align = 'left' }) => align};
  include-font-padding: false;
  text-align-vertical: center;
`;
