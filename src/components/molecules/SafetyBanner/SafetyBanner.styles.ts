import styled from 'styled-components/native';
import { verticalScale, moderateScale, scale } from '@/styles';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.tertiary_container};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(10)}px;
  padding-horizontal: ${scale(16)}px;
  gap: ${scale(8)}px;
`;

export const Message = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(11)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_tertiary_container};
  letter-spacing: 0.5px;
  text-align: center;
`;
