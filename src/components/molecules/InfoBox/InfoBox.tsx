import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '../../atoms/Typography';
import { StyledInfoBox, IconContainer } from './InfoBox.styles';
import { InfoBoxProps } from './types';

export const InfoBox: React.FC<InfoBoxProps> = ({ children, style }) => {
  const theme = useTheme();

  return (
    <StyledInfoBox style={style}>
      <IconContainer>
        <Icon name="info" size={20} color={theme.colors.primary} />
      </IconContainer>
      <Typography variant="label" size="md" color={theme.colors.on_surface_variant} style={{ flex: 1 }}>
        {children}
      </Typography>
    </StyledInfoBox>
  );
};
