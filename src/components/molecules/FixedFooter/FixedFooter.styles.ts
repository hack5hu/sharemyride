import styled from 'styled-components/native';
import { scale, verticalScale } from '@/styles';

export const Container = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  elevation: 8;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  z-index: 50;
`;
