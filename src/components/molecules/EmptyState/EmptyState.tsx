import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { 
  Container, 
  IconContainer, 
  TextContainer, 
  Title, 
  Description 
} from './EmptyState.styles';
import { EmptyStateProps } from './types.d';
import { moderateScale } from '@/styles';

/**
 * EmptyState Molecule
 * Used to display a consistent message when no data is available.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon = 'search-off', 
  title, 
  description 
}) => {
  const theme = useTheme();

  return (
    <Container>
      <IconContainer>
        <Icon 
          name={icon} 
          size={moderateScale(64)} 
          color={theme.colors.on_surface_variant} 
          style={{ opacity: 0.5 }}
        />
      </IconContainer>
      <TextContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextContainer>
    </Container>
  );
};
