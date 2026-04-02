import React from 'react';
import { CategoryIcon } from '@/components/atoms/CategoryIcon';
import { Container, Label } from './CategoryButton.styles';
import { CategoryButtonProps } from './types.d';

export const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  label, 
  icon, 
  variant, 
  isSelected = false, 
  onPress 
}) => {
  return (
    <Container 
      isSelected={isSelected} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <CategoryIcon 
        icon={icon} 
        variant={variant} 
        size={40} 
      />
      <Label numberOfLines={1}>{label}</Label>
    </Container>
  );
};
