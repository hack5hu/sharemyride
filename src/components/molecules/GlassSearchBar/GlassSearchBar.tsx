import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { 
  Container, 
  InputWrapper, 
  StyledInput, 
  LocationButton 
} from './GlassSearchBar.styles';
import { GlassSearchBarProps } from './types.d';
import { moderateScale } from '@/styles';

export const GlassSearchBar: React.FC<GlassSearchBarProps> = ({ 
  value, 
  onChangeText, 
  onLocationPress,
  placeholder = "Search for a place or address"
}) => {
  const theme = useTheme();

  return (
    <Container>
      <InputWrapper>
        <Icon 
          name="search" 
          size={moderateScale(20)} 
          color={theme.colors.outline} 
        />
        <StyledInput 
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          autoCorrect={false}
          autoCapitalize="sentences"
        />
      </InputWrapper>
      
      <LocationButton onPress={onLocationPress} activeOpacity={0.8}>
        <Icon 
          name="my-location" 
          size={moderateScale(20)} 
          color={theme.colors.on_primary} 
        />
      </LocationButton>
    </Container>
  );
};
