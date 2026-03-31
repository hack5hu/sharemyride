import styled from 'styled-components/native';
import { moderateScale } from '@/styles';
import { IconButtonProps, IconButtonSize, IconButtonVariant } from './types';

const sizes: Record<IconButtonSize, number> = {
  sm: 28,
  md: 36,
  lg: 48,
};

const getBackground = (variant: IconButtonVariant, theme: any) => {
  switch (variant) {
    case 'primary': return theme.colors.primary;
    case 'surface': return theme.colors.surface_container;
    case 'secondary': return theme.colors.secondary_container;
    default: return theme.colors.primary;
  }
};

export const StyledIconButton = styled.TouchableOpacity<{
  size: IconButtonSize;
  variant: IconButtonVariant;
}>`
  width: ${({ size }) => moderateScale(sizes[size])}px;
  height: ${({ size }) => moderateScale(sizes[size])}px;
  border-radius: ${({ size }) => moderateScale(sizes[size] / 2)}px;
  background-color: ${({ variant, theme }) => getBackground(variant, theme)};
  justify-content: center;
  align-items: center;
  ${({ theme, variant }) => variant === 'surface' && `
    border-width: 1px;
    border-color: ${theme.colors.outline_variant};
  `}
`;
