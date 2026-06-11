import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from '@/styles';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const CheckboxContainer = styled.TouchableOpacity<{
  checked: boolean;
  disabled?: boolean;
}>`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: ${moderateScale(6)}px;
  border-width: 2px;
  border-color: ${({ theme, checked, disabled }) => {
    if (disabled) return theme.colors.outline_variant;
    return checked ? theme.colors.primary : theme.colors.outline_variant;
  }};
  background-color: ${({ theme, checked, disabled }) => {
    if (disabled) return checked ? theme.colors.outline_variant : 'transparent';
    return checked ? theme.colors.primary : 'transparent';
  }};
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  disabled,
}) => {
  return (
    <CheckboxContainer
      checked={checked}
      disabled={disabled}
      onPress={disabled ? undefined : onToggle}
      activeOpacity={disabled ? 1 : 0.7}
    >
      {checked && <Icon name="check" size={moderateScale(18)} color="white" />}
    </CheckboxContainer>
  );
};
