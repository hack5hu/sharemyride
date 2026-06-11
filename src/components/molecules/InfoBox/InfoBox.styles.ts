import styled from 'styled-components/native';
import { scale, verticalScale } from '@/styles';

export const StyledInfoBox = styled.View`
  flex-direction: row;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.primary + '11'}; /* 10% opacity primary */
  border-radius: ${({ theme }) => theme.roundness.md}px;
  padding: ${scale(16)}px;
  gap: ${scale(12)}px;
  width: 100%;
`;

export const IconContainer = styled.View`
  margin-top: ${verticalScale(2)}px;
`;
