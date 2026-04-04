import React from 'react';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { Container, TitleContainer, Title, ActionButton, ActionText } from './SectionHeader.styles';
import { SectionHeaderProps } from './types.d';

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  badgeLabel, 
  actionLabel, 
  onActionPress 
}) => {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        {badgeLabel && (
          <StatusBadge 
            label={badgeLabel} 
            variant="primary" 
            isUppercase={true} 
          />
        )}
      </TitleContainer>
      
      {actionLabel && (
        <ActionButton onPress={onActionPress} activeOpacity={0.7}>
          <ActionText>{actionLabel}</ActionText>
        </ActionButton>
      )}
    </Container>
  );
};
