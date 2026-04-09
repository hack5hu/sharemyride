import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from '@/styles';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

const CheckboxContainer = styled.TouchableOpacity<{ checked: boolean }>`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: ${moderateScale(6)}px;
  border-width: 2px;
  border-color: ${({ theme, checked }) => checked ? theme.colors.primary : theme.colors.outline_variant};
  background-color: ${({ theme, checked }) => checked ? theme.colors.primary : 'transparent'};
  justify-content: center;
  align-items: center;
`;

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onToggle }) => {
  return (
    <CheckboxContainer checked={checked} onPress={onToggle}>
      {checked && <Icon name="check" size={moderateScale(18)} color="white" />}
    </CheckboxContainer>
  );
};
