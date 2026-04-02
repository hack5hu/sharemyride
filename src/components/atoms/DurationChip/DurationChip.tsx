import React from 'react';
import { ChipContainer, ChipText } from './DurationChip.styles';
import { DurationChipProps } from './types.d';

export const DurationChip: React.FC<DurationChipProps> = ({ 
  label, 
  isSelected = false, 
  onPress 
}) => {
  return (
    <ChipContainer isSelected={isSelected} onPress={onPress} activeOpacity={0.8}>
      <ChipText isSelected={isSelected}>{label}</ChipText>
    </ChipContainer>
  );
};
