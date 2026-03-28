import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { Container, StyledInput, LabelText, ErrorText } from './Input.styles';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <Container style={containerStyle}>
      {label && <LabelText>{label}</LabelText>}
      <StyledInput
        isFocused={isFocused}
        hasError={!!error}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={theme.colors.on_surface_variant + '66'} // 40% opacity
        selectionColor={theme.colors.primary}
        {...props}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};
