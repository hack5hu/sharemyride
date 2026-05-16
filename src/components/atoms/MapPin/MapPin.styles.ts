import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const PinCircle = styled.View`
  width: ${moderateScale(36)}px;
  height: ${moderateScale(36)}px;
  border-radius: ${moderateScale(18)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-width: 4px;
  border-color: ${({ theme }) => theme.colors.surface};
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const PinStem = styled.View`
  width: ${scale(4)}px;
  height: ${verticalScale(20)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom-left-radius: ${scale(2)}px;
  border-bottom-right-radius: ${scale(2)}px;
  margin-top: -2px;
`;

