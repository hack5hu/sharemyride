import React from 'react';
import styled from 'styled-components/native';
import { moderateScale, responsiveFont } from '@/styles';

const Button = styled.TouchableOpacity`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: 9999px;
  border-width: 1.5px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant}4D`};
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const ButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(24)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  line-height: ${responsiveFont(28)}px;
`;

export interface CounterButtonProps {
  type: 'add' | 'remove';
  onPress: () => void;
  disabled?: boolean;
}

export const CounterButton: React.FC<CounterButtonProps> = ({ type, onPress, disabled }) => (
  <Button onPress={onPress} disabled={disabled} activeOpacity={0.7} style={{ opacity: disabled ? 0.4 : 1 }}>
    <ButtonText>{type === 'add' ? '+' : '−'}</ButtonText>
  </Button>
);
