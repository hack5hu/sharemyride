import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Container } from './VerifiedBadge.styles';
import { VerifiedBadgeProps } from './types.d';
import { moderateScale } from '@/styles';

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 16 }) => {
  const theme = useTheme();

  return (
    <Container size={size}>
      <Icon 
        name="verified" 
        size={moderateScale(size * 0.6)} 
        color={theme.colors.on_primary} 
        style={{ fontVariationSettings: "'FILL' 1" }}
      />
    </Container>
  );
};
