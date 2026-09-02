import React from 'react';
import { type TypographyProps } from './types';
import { StyledText } from './Typography.styles';

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  size = 'md',
  weight,
  color,
  align,
  ...props
}) => {
  return (
    <StyledText
      variant={variant}
      size={size}
      weight={weight}
      $color={color}
      align={align}
      {...props}
    >
      {children}
    </StyledText>
  );
};
