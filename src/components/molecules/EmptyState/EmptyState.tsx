import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import {
  Container,
  IconContainer,
  TextContainer,
  Title,
  Description,
} from './EmptyState.styles';
import { type EmptyStateProps } from './types.d';

/**
 * EmptyState Molecule
 * Used to display a consistent message when no data is available.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search-off',
  title,
  description,
}) => {
  const theme = useTheme();

  const iconStyle = { opacity: 0.5 };

  return (
    <Container>
      <IconContainer>
        <Icon
          name={icon}
          size={moderateScale(64)}
          color={theme.colors.on_surface_variant}
          style={iconStyle}
        />
      </IconContainer>
      <TextContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextContainer>
    </Container>
  );
};
