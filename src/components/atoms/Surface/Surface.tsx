import React from 'react';
import { StyledSurface } from './Surface.styles';
import { SurfaceProps } from './types';

export const Surface: React.FC<SurfaceProps> = ({
  children,
  elevation = 'low',
  rounded = 'md',
  padding = 'md',
  style,
  ...props
}) => {
  return (
    <StyledSurface
      $elevation={elevation}
      $rounded={rounded}
      $padding={padding}
      style={style}
      {...props}
    >
      {children}
    </StyledSurface>
  );
};
