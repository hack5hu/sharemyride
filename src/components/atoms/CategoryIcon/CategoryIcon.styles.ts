import styled from 'styled-components/native';
import { moderateScale } from '@/styles';
import { CategoryIconVariant } from './types.d';

export const IconWrapper = styled.View<{ variant: CategoryIconVariant; size: number }>`
  width: ${({ size }) => moderateScale(size)}px;
  height: ${({ size }) => moderateScale(size)}px;
  border-radius: ${({ size }) => moderateScale(size / 2)}px;
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary': return theme.colors.primary_fixed;
      case 'secondary': return theme.colors.secondary_fixed;
      case 'tertiary': return theme.colors.tertiary_fixed;
      case 'emerald': return '#d1fae5'; // Emerald-100 from design
      case 'surface': return theme.colors.surface_variant;
      default: return theme.colors.surface_container;
    }
  }};
  justify-content: center;
  align-items: center;
`;
