import styled from 'styled-components/native';
import { SurfaceElevation, SurfaceRounded, SurfacePadding } from './types';

const getElevationStyle = (elevation: SurfaceElevation, theme: any) => {
  switch (elevation) {
    case 'lowest':
      return `
        background-color: ${theme.colors.surface_container_lowest};
        border-width: 1px;
        border-color: ${theme.colors.outline_variant};
      `;
    case 'low':
      return `
        background-color: ${theme.colors.surface_container_low};
        border-width: 1px;
        border-color: ${theme.colors.outline_variant};
      `;
    case 'medium':
      return `
        background-color: ${theme.colors.surface_container};
        shadow-color: ${theme.colors.shadow};
        shadow-offset: 0px 2px;
        shadow-opacity: 0.1;
        shadow-radius: 4px;
        elevation: 3;
      `;
    default:
      return `background-color: ${theme.colors.surface};`;
  }
};

export const StyledSurface = styled.View<{
  $elevation?: SurfaceElevation;
  $rounded?: SurfaceRounded;
  $padding?: SurfacePadding;
}>`
  border-radius: ${({ $rounded = 'md', theme }) => theme.roundness[$rounded as keyof typeof theme.roundness]}px;
  padding: ${({ $padding = 'md', theme }) => ($padding === 'none' ? 0 : theme.spacing[$padding as keyof typeof theme.spacing])}px;
  ${({ $elevation = 'low', theme }) => getElevationStyle($elevation, theme)}
  
`;
