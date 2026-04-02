import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Container, Message } from './SafetyBanner.styles';
import { SafetyBannerProps } from './types.d';
import { moderateScale } from '@/styles';

export const SafetyBanner: React.FC<SafetyBannerProps> = ({ message }) => {
  const theme = useTheme();

  return (
    <Container>
      <Icon 
        name="security" 
        size={moderateScale(18)} 
        color={theme.colors.on_tertiary_container} 
      />
      <Message>{message.toUpperCase()}</Message>
    </Container>
  );
};
