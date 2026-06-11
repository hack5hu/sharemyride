import styled from 'styled-components/native';
import { scale, verticalScale } from '@/styles';

export const Container = styled.View`
  width: 100%;
  margin-top: ${verticalScale(32)}px;
`;

export const DividerRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(24)}px;
`;

export const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.outline_variant};
`;

export const DividerText = styled.View`
  padding-horizontal: ${scale(16)}px;
`;

export const ButtonsRow = styled.View`
  flex-direction: row;
  gap: ${scale(12)}px;
  width: 100%;
`;
