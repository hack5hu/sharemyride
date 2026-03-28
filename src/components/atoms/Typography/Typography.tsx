import React from 'react';
import { StyledText } from './Typography.styles';
import { TypographyProps } from './types';

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
      color={color}
      align={align}
      {...props}
    >
      {children}
    </StyledText>
  );
};
