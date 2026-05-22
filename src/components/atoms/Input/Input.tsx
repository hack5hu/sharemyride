import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { NativeSyntheticEvent, FocusEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, InputWrapper, InnerInput, IconContainer, LabelText, ErrorText, RequiredAsterisk, PrefixContainer, PrefixText } from './Input.styles';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  prefix,
  required,
  containerStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  const handleFocus = (e: FocusEvent) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <Container style={containerStyle}>
      {label && (
        <LabelText>
          {label}
          {required && <RequiredAsterisk> *</RequiredAsterisk>}
        </LabelText>
      )}
      <InputWrapper isFocused={isFocused} hasError={!!error} multiline={props.multiline}>
        {leftIcon && (
          <IconContainer>
            <Icon name={leftIcon} size={20} color={theme.colors.on_surface_variant} />
          </IconContainer>
        )}
        {prefix && (
          <PrefixContainer>
            <PrefixText>{prefix}</PrefixText>
          </PrefixContainer>
        )}

        <InnerInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={theme.colors.on_surface_variant + '66'} // 40% opacity
          selectionColor={theme.colors.primary}
          multiline={props.multiline}
          {...props}
        />

        {rightIcon && (
          <IconContainer>
            <Icon name={rightIcon} size={20} color={theme.colors.on_surface_variant} />
          </IconContainer>
        )}
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};
