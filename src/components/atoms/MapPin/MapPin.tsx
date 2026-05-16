import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Container, PinCircle, PinStem } from './MapPin.styles';
import { MapPinProps } from './types.d';
import { moderateScale } from '@/styles';

export const MapPin: React.FC<MapPinProps> = ({ isVisible = true }) => {
  const theme = useTheme();

  if (!isVisible) return null;

  return (
    <Container>
      <PinCircle>
        <Icon 
          name="location-on" 
          size={moderateScale(18)} 
          color={theme.colors.on_primary} 
        />
      </PinCircle>
      <PinStem />
    </Container>
  );
};
