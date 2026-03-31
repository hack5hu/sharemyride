import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { StyledIconButton } from './IconButton.styles';
import { IconButtonProps } from './types';

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  variant = 'primary',
  onPress,
  style,
  ...props
}) => {
  const theme = useTheme();
  
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 16;
      case 'md': return 20;
      case 'lg': return 24;
      default: return 20;
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'primary': return theme.colors.on_primary;
      case 'surface': return theme.colors.on_surface;
      case 'secondary': return theme.colors.on_secondary_container;
      default: return theme.colors.on_primary;
    }
  };

  return (
    <StyledIconButton
      size={size}
      variant={variant}
      onPress={onPress}
      activeOpacity={0.7}
      style={style}
      {...props}
    >
      <Icon name={icon} size={getIconSize()} color={getIconColor()} />
    </StyledIconButton>
  );
};
