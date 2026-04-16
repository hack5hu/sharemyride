import React from 'react';
import styled from 'styled-components/native';
import { moderateScale, responsiveFont } from '@/styles';

const Button = styled.TouchableOpacity<{ size: 'small' | 'medium' }>`
  width: ${({ size }) => moderateScale(size === 'small' ? 36 : 48)}px;
  height: ${({ size }) => moderateScale(size === 'small' ? 36 : 48)}px;
  border-radius: 9999px;
  border-width: 1.5px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant}4D`};
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const ButtonText = styled.Text<{ size: 'small' | 'medium' }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${({ size }) => responsiveFont(size === 'small' ? 18 : 24)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  line-height: ${({ size }) => responsiveFont(size === 'small' ? 22 : 28)}px;
`;

export interface CounterButtonProps {
  type: 'add' | 'remove';
  onPress: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

export const CounterButton: React.FC<CounterButtonProps> = ({ 
  type, 
  onPress, 
  disabled, 
  size = 'medium' 
}) => (
  <Button 
    onPress={onPress} 
    disabled={disabled} 
    size={size}
    activeOpacity={0.7} 
    style={{ opacity: disabled ? 0.4 : 1 }}
  >
    <ButtonText size={size}>{type === 'add' ? '+' : '−'}</ButtonText>
  </Button>
);
