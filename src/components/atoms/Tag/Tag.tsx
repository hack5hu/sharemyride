import React from 'react';
import { StyledTag } from './Tag.styles';
import { TagProps } from './types';
import { Typography } from '../Typography';
import { useTheme } from 'styled-components/native';

export const Tag: React.FC<TagProps> = ({
  children,
  active = false,
  onPress,
  style,
}) => {
  const theme = useTheme();
  
  return (
    <StyledTag active={active} onPress={onPress} activeOpacity={0.7} style={style}>
      <Typography
        variant="label"
        size="md"
        weight="semibold"
        color={active ? theme.colors.on_primary : theme.colors.on_surface_variant}
      >
        {children}
      </Typography>
    </StyledTag>
  );
};
