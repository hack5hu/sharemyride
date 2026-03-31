import styled from 'styled-components/native';
import { scale, responsiveFont } from '../../../styles';
import { ToastType } from './types';

export const ToastContainer = styled.View<{ type: ToastType }>`
  flex-direction: row;
  align-items: center;
  padding: ${scale(16)}px;
  border-radius: ${({ theme }) => theme.roundness.sm}px;
  background-color: ${({ theme, type }) =>
    type === 'error'
      ? theme.colors.error_container
      : theme.colors.primary_container};
  border-width: 1px;
  border-color: ${({ theme, type }) =>
    type === 'error' ? theme.colors.error + '33' : theme.colors.primary + '33'};
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 4;
  margin-top: ${scale(8)}px;
  width: 100%;
`;

export const ToastText = styled.Text<{ type: ToastType }>`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme, type }) =>
    type === 'error'
      ? theme.colors.on_error_container
      : theme.colors.on_primary_container};
  margin-left: ${scale(12)}px;
  flex: 1;
`;
