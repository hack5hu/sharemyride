import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Container, InputWrapper, StyledTextInput, IconButton } from './SearchInput.styles';
import { SearchInputProps } from './types';
import { moderateScale } from '@/styles';

export const SearchInput: React.FC<SearchInputProps> = ({
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
      <InputWrapper isFocused={isFocused}>
        <IconButton>
          <MaterialIcon 
            name="search" 
            size={moderateScale(24)} 
            color={theme.colors.outline} 
          />
        </IconButton>
        <StyledTextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={`${theme.colors.on_surface_variant}90`} // 60% opacity for placeholder
          selectionColor={theme.colors.primary}
          {...props}
        />
      </InputWrapper>
    </Container>
  );
};
