import styled from 'styled-components/native';
import { moderateScale } from '@/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View<{ size: number }>`
  width: ${({ size }) => moderateScale(size)}px;
  height: ${({ size }) => moderateScale(size)}px;
  border-radius: ${({ size }) => moderateScale(size / 2)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.surface};
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled(Icon)`
  font-variation-settings: 'FILL' 1;
`;

