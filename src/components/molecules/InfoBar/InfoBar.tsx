import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { StyledInfoBar, Content, IconContainer, TextContainer } from './InfoBar.styles';
import { InfoBarProps } from './types';
import { Typography } from '../../atoms/Typography';

export const InfoBar: React.FC<InfoBarProps> = ({
  title,
  subtitle,
  variant = 'info',
  style,
}) => {
  const theme = useTheme();

  const getIconName = () => {
    switch (variant) {
      case 'error': return 'error';
      case 'success': return 'check-circle';
      default: return 'info';
    }
  };

  const getColors = () => {
    switch (variant) {
      case 'error':
        return {
          bg: theme.colors.error_container,
          text: theme.colors.error,
          icon: theme.colors.error,
          border: `${theme.colors.error}1A`, // 10% opacity
        };
      case 'success':
        return {
          bg: theme.colors.primary_container,
          text: theme.colors.on_primary_container,
          icon: theme.colors.primary,
          border: `${theme.colors.primary}1A`,
        };
      default:
        return {
          bg: theme.colors.surface_container,
          text: theme.colors.on_surface,
          icon: theme.colors.primary,
          border: theme.colors.outline_variant,
        };
    }
  };

  const colors = getColors();

  return (
    <StyledInfoBar variant={variant} style={style} colors={colors}>
      <IconContainer>
        <Icon name={getIconName()} size={20} color={colors.icon} />
      </IconContainer>
      <TextContainer>
        <Typography
          variant="label"
          size="md"
          weight="bold"
          color={colors.text}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="label"
            size="sm"
            color={theme.colors.on_surface_variant}
            style={{ marginTop: 2 }}
          >
            {subtitle}
          </Typography>
        )}
      </TextContainer>
    </StyledInfoBar>
  );
};
