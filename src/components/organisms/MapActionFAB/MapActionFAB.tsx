import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Container, Label } from './MapActionFAB.styles';
import { MapActionFABProps } from './types.d';
import { moderateScale } from '@/styles';

export const MapActionFAB: React.FC<MapActionFABProps> = ({ onPress, label }) => {
  const theme = useTheme();

  return (
    <Container onPress={onPress} activeOpacity={0.9}>
      <Icon 
        name="check-circle" 
        size={moderateScale(20)} 
        color={theme.colors.on_primary} 
      />
      <Label>{label}</Label>
    </Container>
  );
};
