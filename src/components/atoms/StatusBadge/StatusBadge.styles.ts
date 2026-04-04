import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { StatusBadgeVariant } from './types.d';

interface ContainerProps {
  variant: StatusBadgeVariant;
}

const getStyles = (theme: any, variant: StatusBadgeVariant) => {
  switch (variant) {
    case 'matched':
      return {
        bg: theme.colors.on_primary_fixed_variant,
        text: theme.colors.primary_fixed,
      };
    case 'pending':
    case 'primary':
      return {
        bg: theme.colors.primary_container,
        text: theme.colors.on_primary_container,
      };
    case 'secondary':
      return {
        bg: theme.colors.secondary_container,
        text: theme.colors.on_secondary_container,
      };
    default:
      return {
        bg: theme.colors.surface_container_highest,
        text: theme.colors.on_surface_variant,
      };
  }
};

export const Container = styled.View<ContainerProps>`
  background-color: ${({ theme, variant }) => getStyles(theme, variant).bg};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 9999px;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
`;

export const LabelText = styled.Text<ContainerProps>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(10)}px;
  font-weight: 800;
  color: ${({ theme, variant }) => getStyles(theme, variant).text};
`;
