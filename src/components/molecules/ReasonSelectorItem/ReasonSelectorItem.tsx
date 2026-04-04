import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { Container, Label, UncheckedCircle } from './ReasonSelectorItem.styles';
import { ReasonSelectorItemProps } from './types.d';

export const ReasonSelectorItem: React.FC<ReasonSelectorItemProps> = ({ 
  label, 
  isSelected, 
  onPress 
}) => {
  const theme = useTheme();

  return (
    <Container isSelected={isSelected} onPress={onPress} activeOpacity={0.8}>
      <Label isSelected={isSelected}>{label}</Label>
      {isSelected ? (
        <Icon 
          name="check-circle" 
          size={moderateScale(24)} 
          color={theme.colors.on_primary_container} 
        />
      ) : (
        <UncheckedCircle />
      )}
    </Container>
  );
};
