import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '../Typography';
import { StyledButton, GradientBackground, OutlineContainer, ButtonContent } from './Button.styles';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  loading,
  disabled,
  ...props
}) => {
  const theme = useTheme();

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={variant === 'primary' ? theme.colors.on_primary : theme.colors.primary} />;
    }

    const color = variant === 'primary' ? theme.colors.on_primary : theme.colors.primary;

    return (
      <ButtonContent>
        {icon && iconPosition === 'left' && <Icon name={icon} size={20} color={color} />}
        <Typography variant="title" size="md" color={color} weight="bold">
          {children}
        </Typography>
        {icon && iconPosition === 'right' && <Icon name={icon} size={20} color={color} />}
      </ButtonContent>
    );
  };

  if (variant === 'primary') {
    return (
      <StyledButton disabled={disabled || loading} activeOpacity={0.8} {...props}>
        <GradientBackground
          colors={
            disabled || loading
              ? [theme.colors.outline_variant, theme.colors.outline_variant]
              : [theme.colors.primary, theme.colors.primary_container]
          }
          disabled={disabled || loading}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {renderContent()}
        </GradientBackground>
      </StyledButton>
    );
  }

  return (
    <StyledButton disabled={disabled || loading} activeOpacity={0.7} {...props}>
      <OutlineContainer variant={variant}>{renderContent()}</OutlineContainer>
    </StyledButton>
  );
};
