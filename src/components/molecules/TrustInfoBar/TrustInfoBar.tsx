import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Container, InfoText } from './TrustInfoBar.styles';
import { TrustInfoBarProps } from './types.d';
import { moderateScale } from '@/styles';

export const TrustInfoBar: React.FC<TrustInfoBarProps> = ({ message }) => {
  const theme = useTheme();

  return (
    <Container>
      <Icon 
        name="verified-user" 
        size={moderateScale(16)} 
        color={theme.colors.on_primary_fixed_variant} 
      />
      <InfoText>{message}</InfoText>
    </Container>
  );
};
