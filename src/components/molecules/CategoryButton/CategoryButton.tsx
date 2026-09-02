import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { Container, IconBox, Label, RadioCircle } from './CategoryButton.styles';
import { type CategoryButtonProps } from './types.d';

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  label,
  icon,
  isSelected = false,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <Container isSelected={isSelected} onPress={onPress} activeOpacity={0.75}>
      <IconBox isSelected={isSelected}>
        <Icon
          name={icon}
          size={moderateScale(20)}
          color={
            isSelected
              ? theme.colors.primary
              : theme.colors.on_surface_variant
          }
        />
      </IconBox>
      <Label isSelected={isSelected} numberOfLines={1}>
        {label}
      </Label>
      <RadioCircle isSelected={isSelected}>
        {isSelected ? (
          <Icon
            name="check"
            size={moderateScale(13)}
            color={theme.colors.on_primary || '#FFFFFF'}
          />
        ) : null}
      </RadioCircle>
    </Container>
  );
};
