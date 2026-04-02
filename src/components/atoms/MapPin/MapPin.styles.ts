import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const PinCircle = styled.View`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: ${moderateScale(24)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-width: 4px;
  border-color: ${({ theme }) => theme.colors.surface};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.on_background};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.3;
  shadow-radius: 12px;
  elevation: 8;
  z-index: 2;
`;

export const PinStem = styled.View`
  width: ${scale(4)}px;
  height: ${verticalScale(32)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom-left-radius: ${scale(2)}px;
  border-bottom-right-radius: ${scale(2)}px;
  margin-top: -2px;
  shadow-color: ${({ theme }) => theme.colors.on_background};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

export const PinShadow = styled.View`
  width: ${moderateScale(16)}px;
  height: ${moderateScale(6)}px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: ${moderateScale(3)}px;
  margin-top: ${verticalScale(4)}px;
`;
