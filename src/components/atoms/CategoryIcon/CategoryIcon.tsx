import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { IconWrapper } from './CategoryIcon.styles';
import { type CategoryIconProps } from './types.d';

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  icon,
  variant = 'surface',
  size = 48,
}) => {
  const theme = useTheme();

  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'tertiary':
        return theme.colors.tertiary;
      case 'emerald':
        return '#065f46'; // Emerald-800 from design
      case 'surface':
        return theme.colors.on_surface_variant;
      default:
        return theme.colors.on_surface_variant;
    }
  };

  return (
    <IconWrapper variant={variant} size={size}>
      <Icon
        name={icon}
        size={moderateScale(size * 0.5)}
        color={getIconColor()}
      />
    </IconWrapper>
  );
};
