import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { Container, InfoText } from './TrustInfoBar.styles';
import { type TrustInfoBarProps } from './types.d';

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
